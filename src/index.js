const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const { Todo } = require('./models/todo');
const { mongoURI } = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors()) ;

mongoose.connect(mongoURI, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));// eslint-disable-line

app.get('/todos', (req, res) => {
  Todo.find()
  .then((todos) => {
    res.send(todos);
  })
  .catch((err) => {
    res.send(err);
  });
});

app.post('/todos', (req, res) => {
  if(req.body.content === '' ) {
    return res.send({ message: 'Todo cannot be empty!' })
  }
  const someTodo = new Todo({
    content: req.body.content,
    finished: req.body.finished,
  });
  Todo.find({ content: someTodo.content }).then((todos) => {
    if (todos.length === 0) {
      someTodo.save()
      .then((todo) => {
        res.send(todo);
      })
      .catch((err) => {
        res.send(err);
      });
    } else {
      res.send({ message: 'such todo already exsts!' });
    }
  });
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndRemove(id)
  .then((todo) => {
    res.send(todo);
  })
  .catch((err) => {
    res.send(err);
  });
});

app.patch('/todos/:id',cors(),  (req, res) => {
  const { finished } = req.body;
  const { id } = req.params;
  console.log(req.body)
  Todo.findByIdAndUpdate(id, { $set: { finished: finished } }, { new: true })
  .then(() => {
    res.send();
  })
  .catch((err) => {
    res.send(err);
  });
});

app.listen(PORT, () => {
  console.log('app running');// eslint-disable-line
});
