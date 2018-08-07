const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  firstName: String,
  googleId: String,
  lastName: String,
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  },
  photo: String
})

module.exports = mongoose.model('User', UserSchema);