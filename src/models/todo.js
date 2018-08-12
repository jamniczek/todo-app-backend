const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  content: String,
  finished: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo };
