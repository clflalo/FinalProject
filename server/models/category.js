const { Schema, model } = require('mongoose');

// create tasks schema and model
const categorySchema = new Schema({
    _id: String,
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200
    },
    description: {
      type: String,
      maxlength: 500
    }
  }, {
    timestamps: true
  })
  const Category = model('Category', categorySchema);

  module.exports = Category;