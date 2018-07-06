const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  firstName: String,
  googleId: String,
  lastName: String,
  photo: String
})

module.exports = mongoose.model('User', UserSchema);