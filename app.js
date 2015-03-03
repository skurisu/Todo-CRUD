var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

// db
mongoose.connect('mongodb://localhost/todoCRUD');
var Schema = mongoose.Schema;

var toDoSchema = new Schema ({
  title : String,
  description : String,
  is_done : Boolean,
  created_at : Date
});

var ToDo = mongoose.model('todo', toDoSchema);

// middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'jade');

// routes
app.get('/', function (req, res) {
  ToDo.find(function (err, todos_fromdb) {
    res.render('list', {
      todos : todos_fromdb
    });
  });
});

app.get('/new_todo', function (req, res) {
  res.render('new_todo');
});

app.post('/todos', function (req, res) {

  // create todo object

  var todo = new ToDo({
    title : req.body.title,
    description : req.body.description,
    is_done : false,
    created_at : new Date()

  });

  // save todo object to db
  todo.save(function (err) {
    if (err) throw err;
    res.redirect('/');
  });
});


app.delete('/todos/:id', function (req, res) {
  var todo_id = req.params.id;
  
  ToDo.findById(todo_id, function (err, todo) {
    todo.remove(function (err, todo) {
      res.redirect('/');
    });
  });
});

app.put('/todos/:id/complete', function (req, res) {
  var todo_id = req.params.id;
  var is_done = req.body.is_done;

  ToDo.findById(todo_id, function (err, todo) {
    todo.is_done = is_done;

    todo.save(function (err) {
      if (err) throw err;
      res.send('winston');
    });
  });
});

app.put('/todos/:id/uncomplete', function (req, res) {
  var todo_id = req.params.id;
  var is_done = req.body.is_done;

  ToDo.findById(todo_id, function (err, todo) {
  todo.is_done = is_done;

    todo.save(function (err) {
      if (err) throw err;
      res.send('winston');
    });
  });
});

app.get('/todos/:id/edit', function (req, res) {
  var todo_id = req.params.id;

  ToDo.findById(todo_id, function (err, todo) {
    res.render('edit_todo', {
      todo : todo
    });
  });
});

app.put('/todos/:id', function (req, res) {
  var todo_id = req.params.id;

  ToDo.findById(todo_id, function (err, todo) {
    
    todo.update({
      $set: {
        title : req.body.title,
        description : req.body.description,
      }
    }, function (err) {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});