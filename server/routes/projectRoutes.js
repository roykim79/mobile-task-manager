const Project = require("../models/Project");
const Task = require("../models/Task");
const requireLogin = require('../middlewares/requireLogin');
const ObjectId = require('mongodb').ObjectID;

module.exports = app => {
  // POST - create new Project
  app.post('/api/projects', (req, res) => {
    const project = new Project({
      name: req.body.name
    });

    project.save((err) => {
      if (err) {
        throw err;
      } else {
        return res.send(project);
      }
    })
  })

  // GET all Projects 
  app.get('/api/projects', (req, res) => {
    Project.find({}, (err, projects) => {
      if (err) {
        throw err;
      } else {
        return res.send(projects);
      }
    })
  })

  // GET Project by id
  app.get('/api/projects/:projectId', (req, res) => {
    Project.findOne({_id: req.params.projectId}, (err, projects) => {
      if (err) {
        throw err;
      } else {
        return res.send(projects);
      }
    })
  })

  // GET all tasks for a Project found by project id with tasks populated
  app.get('/api/projects/:projectId/tasks', (req, res) => {
  Task.find( {'project': ObjectId(req.params.projectId) })
    .populate('assignedTo')
    .exec((err, tasks) => {
      if (err) {
        throw err;
      } else {
        res.send(tasks)
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
}