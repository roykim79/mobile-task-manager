const Task = require("../models/Task");
const Project = require('../models/Project');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  // GET all Tasks
  app.get('/api/tasks', (req, res) => {
    Task.find({})
      .populate('project')
      .exec((err, tasks) => {
      if (err) {
        throw err;
      } else {
        return res.send(tasks);
      }
    })
  })
  
  // POST - add new Task
  app.post('/api/tasks', (req, res) => {
    const { title, description, project, assignedTo } = req.body;

    // create new Task
    const task = new Task({
      title,
      description,
      project,
      assignedTo
    });

    // save new Task
    task.save((err, task) => {
      if (err) {
        throw err;
      } else {
        // push the new task into the projects tasks for reference
        Project.findById(project).exec((err, project) => {
          if (err) {
            throw err;
          } else {
            project.tasks.push(task)
            project.save(((err, project) => {
              if (err) {
                throw err;
              } else {
                return res.send(task);
              }
            }))
          }
        })
      }
    })
  })
  // GET Task by id
  app.get('/api/tasks/:taskId', (req, res) => {
    Task.findById(req.params.taskId)
      .populate('project', 'name')
      .populate('assignedTo')
      .exec((err, task) => {
      if (err) {
        throw err;
      } else {
        return res.send(task);
      }
    })
  })

  // PUT - Update task found by task id
  app.put('/api/tasks/:taskId', (req, res) => {
    Task.findById(req.params.taskId)
      .exec((err, task) => {
        if (err) {
          throw err;
        } else {
          Object.assign(task, req.body)
          task.save();
          return res.send(task);
        }
      })
  })


  // POST - api/tasks/:taskId/activityLog
  
}