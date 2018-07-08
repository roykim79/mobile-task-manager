const User = require("../models/User");
const requireLogin = require('../middlewares/requireLogin');
const faker = require('faker');

module.exports = app => {
  // GET curent user info
  app.get('/api/userInfo', requireLogin, (req, res) => {
    User.findOne({
      googleId: req.user
    }).then(user => res.send(user))
  })

  // GET user names
  app.get('/api/users', requireLogin, (req, res) => {
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
}