const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  activityLog: [{
    date: {
      type: Date,
      default: Date.now
    },
    text: String,
    posting_user: String
  }],
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  description: String,
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  labels: [{
    type: Schema.Types.ObjectId,
    ref: 'Label'
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'Not started'
  },
  title: {
    type: String
  }
})

module.exports = mongoose.model('Task', TaskSchema);