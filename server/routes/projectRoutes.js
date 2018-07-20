const Project = require("../models/Project");
const Task = require("../models/Task");
const requireLogin = require('../middlewares/requireLogin');
const ObjectId = require('mongodb').ObjectID;

module.exports = app => {
  // POST - create new Project
  app.post('/api/projects', requireLogin, (req, res) => {
    const { name } = req.body;
    // check if project name exists in order to prevent duplicates
    Project.findOne({name}, (err, project) => {
      if (err) {
        throw err;
      } else if (project) {
        return res.status(400).send("Project name already exists, duplicate project names are not allowed");
      }
      
      const newProject = new Project({
        name
      });
  
      newProject.save((err) => {
        if (err) {
          throw err;
        } else {
          return res.send(newProject);
        }
      });
    })





  });

  // GET all Projects 
  app.get('/api/projects', requireLogin, (req, res) => {
    Project.find({}, (err, projects) => {
      if (err) {
        throw err;
      } else {
        return res.send(projects);
      }
    });
  });

  // GET Project by id
  app.get('/api/projects/:projectId', requireLogin, (req, res) => {
    Project.findOne({_id: req.params.projectId}, (err, projects) => {
      if (err) {
        throw err;
      } else {
        return res.send(projects);
      }
    });
  });

  // GET all tasks for a Project found by project id with tasks populated
  app.get('/api/projects/:projectId/tasks', requireLogin, (req, res) => {
  Task.find( {'project': ObjectId(req.params.projectId) })
    .populate('assignedTo')
    .exec((err, tasks) => {
      if (err) {
        throw err;
      } else {
        res.send(tasks)
      }
    });
  });

  // DELETE a project found by its id
  app.delete('/api/projects/:projectId', requireLogin, (req, res) => {
    Project.deleteOne({_id: req.params.projectId}, (err, data) => {
      if (err) {
        throw err;
      } else {
        return res.send(data);
      }
    });
  });
}