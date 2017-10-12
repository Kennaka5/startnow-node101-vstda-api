const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const todos = [
    
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];


app.get('/', function (req, res, next){
    // res.json does this by default
    // res.writeHead(200,{'Content-Type': 'application/json'});
    res.json();
});

app.get('/api/TodoItems/', function(req, res, next){
    res.json(todos);
});

app.get('/api/TodoItems/:todoItemId', function(req, res, next){
    var requestedId = req.params.todoItemId;
    var result = todos.filter(function( obj ) {
        return obj.todoItemId == requestedId;
      });
    res.send(result[0]);
});
var replace = false

app.post('/api/TodoItems/',  function(req, res){ //jsonParser,
    var newTodos = req.body
    var newid = req.body.todoItemId
     for (var i = 0; i < todos.length; i++) {
        if (newid == todos[i].todoItemId){
            todos.splice(i, 1, newTodos)
         
        replace = true
        } 
    }
    if (replace != true){
        todos.push(newTodos)
    }
    res.status(201).json(newTodos);
})

app.delete('/api/TodoItems/:todoItemId', function(req, res){
    var newTodos = req.body
    var newid = req.body.todoItemId
    for (var i = 0; i < todos.length; i++) {
        if (newTodos === todos[i].todoItemId) {
            todos.splice(i, 1)
            ;break
        }
    }
    res.status(200).json(todos[0]);
})
// add your code here

module.exports = app;
