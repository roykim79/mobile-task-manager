const User = require("../models/User");
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  // GET curent user info
  app.get('/api/userInfo', requireLogin, (req, res) => {
    User.findOne({googleId: req.user}).then(user =>  res.send(user))
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
}