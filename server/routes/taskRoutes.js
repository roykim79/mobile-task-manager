const Task = require("../models/Task");
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const emailTemplate = require('../services/emailTemplate');

module.exports = app => {
  // POST - create new Task
  app.post('/api/tasks', requireLogin, (req, res) => {
    const { title, description, project, assignedTo } = req.body;
    const task = new Task({ title, description, project, assignedTo });

    task.save((err, task) => {
      if (err) {
        throw err;
      } else {
        return res.send(task);
      }
    })
  })

  // GET Task by id
  app.get('/api/tasks/:taskId', requireLogin, (req, res) => {
    Task.findById(req.params.taskId)
      .populate('project', 'name')
      .populate('assignedTo')
      .exec((err, task) => {
        if (err) {
          throw err;
        } else {
          return res.send(task);
        }
      });
  });

  //DELETE a Task found by its id
  app.delete('/api/tasks/:taskId', requireLogin, (req, res) => {
    Task.deleteOne({_id: req.params.taskId}, (err, task) => {
      if (err) {
        throw err;
      } else {
        return res.send(task)
      }
    });
  });

  // PUT - Update task found by task id
  app.put('/api/tasks/:taskId', requireLogin, (req, res) => {
    Task.findById(req.params.taskId).exec((err, task) => {
      if (err) {
        throw err;
      } else {
        // check if the user was updated, if so send an email out
        if (task.assignedTo._id.toString() !== req.body.assignedTo._id) {
          Object.assign(task, req.body);
          // ********************************************************
          // UNCOMMENT BELOW TO ACTIVATE MAILER
          // ********************************************************
          // task.recipients = [req.body.assignedTo];
          // task.subject = "Hello";

          // const mailer = new Mailer(task, emailTemplate(task));

          // mailer.send();
        } else {
          Object.assign(task, req.body);
        }

        task.save((err, task) => {
          if (err) {
            throw err;
          } else {
            return res.send(task);
          }
        });
      }
    });
  });
}