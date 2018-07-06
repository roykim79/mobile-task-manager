const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  name: String,
  dateCreated: {
    type: Date,
    default: Date.now
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }]
})

module.exports = mongoose.model('Project', ProjectSchema);