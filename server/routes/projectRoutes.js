const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  // POST - add a new Project
  app.post('/api/projects', (req, res) => {
    const project = new Project({
      name: req.body.name,
      tasks: []
    });

    project.save((err) => {
      if (err) {
        throw err;
      } else {
        return res.send(project);
      }
    })
  })

  // GET curent user info
  app.get('/api/userInfo', (req, res) => {
    User.findOne({googleId: req.user}).then(user =>  res.send(user))
  })

  // GET all Project names
  app.get('/api/projects/names', (req, res) => {
    Project.find({}, 'name', (err, names) => {
      if (err) {
        throw err;
      } else {
        return res.send(names);
      }
    })
  })

  // GET all tasks for a Project found by project id with tasks populated
  app.get('/api/projects/:projectId', (req, res) => {
    Project.findById(req.params.projectId)
      .populate('tasks')
      .exec((err, project) => {
        if (err) {
          throw err;
        } else {
          res.send(project)
        }
    })
  })

    //DELETE a task
    app.delete('/api/projects/:projectId/tasks/:taskId', (req, res) => {
      const { projectId, taskId } = req.params;

      // find the project the task is in by id
      Project.findById(projectId).exec((err, project) => {
        if (err) {
          throw err;
        } else {
          project.tasks.remove({_id: taskId});
          project.save((err, project) => {
            if (err) {
              throw err;
            } else {
              return res.send(project);
            }
          });
        }
      })
    })

    // DELETE a project found by its id
    app.delete('/api/projects/:projectId', (req, res) => {
      Project.deleteOne({_id: req.params.projectId}, (err, data) => {
        if (err) {
          throw err;
        } else {
          return res.send(data);
        }
      })
    })

  // POST new task in Project
  // ???????????????????????????????
  app.post('/api/projects/:projectId/tasks', (req, res) => {
    // find Project by id
    Project.findById(req.params.projectId)
      .exec((err, project) => {
        if (err) {
          throw err;
        } else {
          // create a new instance of Task
          const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            project: project
          });

          // save the new task
          // newTask.save();
          // push new Task to task array of Project
          project.tasks.push(newTask);
          // save the Project
          project.save((err, project) => {
            if (err) {
              throw err;
            } else {
              return res.send(project);
            }
          });
        }
      })
  })
  // GET - api/tasks/createdTasks
  // GET - api/tasks/:labelId
  // POST - api/tasks/
  // GET - api/tasks/:taskId
  // PUT - api/tasks/:taskId
  // POST - api/tasks/:taskId/activityLog
  
}