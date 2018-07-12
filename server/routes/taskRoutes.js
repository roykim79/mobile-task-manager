const Task = require("../models/Task");
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const emailTemplate = require('../services/emailTemplate');

module.exports = app => {
  // POST - create new Task
  app.post('/api/tasks', async (req, res) => {
    const { title, description, project, assignedTo } = req.body;
    // create new Task
    const task = new Task({ title, description, project, assignedTo });

    task.recipients = [assignedTo];
    task._user = req.user._id;
    task.dateSent = Date.now();
    task.subject = "Hello";

    const mailer = new Mailer(task, emailTemplate(task));

    try {
      mailer.send();
      task.save((err, task) => {
        if (err) {
          throw err;
        } else {
          return res.send(task);
        }
      })
    } catch (err) {
      res.status(422).send(err);
    }
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

  //DELETE a Task found by its id
  app.delete('/api/tasks/:taskId', (req, res) => {
    Task.deleteOne({
      _id: req.params.taskId
    }, (err, task) => {
      if (err) {
        throw err;
      } else {
        return res.send(task)
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
}