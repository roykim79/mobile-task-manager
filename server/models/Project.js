const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  name: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Project', ProjectSchema);