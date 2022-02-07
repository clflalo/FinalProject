const { Schema, model } = require('mongoose');

// create tasks schema and model
const taskSchema = new Schema({
    _id: String,
    categoryid: String,
    description: {
      type: String,
      trim: true,
      required: true,
      minlength: [2, 'description should be at least 2 characters'],
      maxlength: 200
    },
    deadline: {
      type: Date,
      required: true
    },
    done: {
      type: Boolean,
      default: false
    },
    important: {
      type: Boolean,
      default: false
    },
  }, {
    timestamps: true
  })
  const Task = model('Task', taskSchema);

  module.exports = Task;