const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrganizationSchema = new Schema({
  name: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Organization', OrganizationSchema);