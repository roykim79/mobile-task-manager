const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabelSchema = new Schema({
  text: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Label', LabelSchema);