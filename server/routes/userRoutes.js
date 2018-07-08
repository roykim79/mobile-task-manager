const User = require("../models/User");
const Task = require("../models/Task");
const Project = require("../models/Project");
const requireLogin = require('../middlewares/requireLogin');
const faker = require('faker');

module.exports = app => {
  // GET curent user info
  app.get('/api/userInfo', (req, res) => {
    User.findOne({
      googleId: req.user
    }).then(user => res.send(user))
  })

  // GET user names
  app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        throw err;
      } else {
        return res.send(users);
      }
    })
  })

  app.get('/api/fake-users', (req, res) => {
    for (let i = 0; i < 10; i++) {
      let fakeUser = new User({
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        googleId: faker.random.uuid(),
        lastName: faker.name.lastName(),
        photo: faker.image.imageUrl()

      });

      fakeUser.save();

      return res.end();
    }
  })

  app.get('/api/fake-tasks', (req, res) => {
    let user;

    User.find({}, (err, users) => {
      user = users[0];
    })

    Project.find({}, (err, projects) => {
      projects.map((project) => {
        for (let i = 0; i < 10; i++) {

          let fakeTask = new Task({
            title: faker.random.words(),
            description: faker.lorem.paragraph(),
            project,
            assignedTo: user
          })

          fakeTask.save();
          return res.end();

        }

      })
    })



  })
}