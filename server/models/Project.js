const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  name: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  }
})

module.exports = mongoose.model('Project', ProjectSchema);