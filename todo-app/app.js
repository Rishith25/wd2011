/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.send("Hello World");
});

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  // FILL IN YOUR CODE HERE
  try {
    const todo = await Todo.findAll();
    return response.json(todo)
    
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
  // First, we have to query our PostgerSQL database using Sequelize to get list of all Todos.
  // Then, we have to respond with all Todos, like:
  // response.send(todos)
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  console.log("We have to delete a Todo with ID: ", request.params.id);
  // FILL IN YOUR CODE HERE
  try {
    const deletedTodo = await todo.deleteTodo(request.params.id);
    return response.json(deletedTodo)
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
  // response.send(true)
});

module.exports = app;


// /* eslint-disable no-unused-vars */
// const { request, response } = require("express")
// const express = require('express');
// const app = express();
// const { Todo } = require("./models")
// const bodyParser = require("body-parser");
// const { where } = require("sequelize");
// app.use(bodyParser.json());
// // app.METHOD(PATH, HANDLER)
// // or
// // app.METHOD(path, callback [, callback ...])


// app.get("/todos", (request, response) => {
//     console.log("Todo List");
// })

// app.post("/todos", async (request, response) => {
//     console.log("Creating a Todo", request.body);
//     //Todo
//     try {
//         const todo = await Todo.addTodo({ title: request.body.title, dueDate: request.body.dueDate, completed: false })
//         return response.json(todo)
//     } catch (error) {
//         console.log(error)
//         return response.status(422).json(error)
//     }

// })

// // PUT http://mytodoapp.com/todos/123/markAsCompleted
// app.put("/todos/:id/markAsCompleted", async (request, response) => {
//     console.log("We have to update a todo with ID:", request.params.id);
//     const todo = await Todo.findByPk(request.params.id);
//     try {
//         const updatedTodo = await todo.markAsCompleted();
//         return response.json(updatedTodo);
//     } catch (error) {
//         console.log(error);
//         return response.status(422).json(error)
//     }
// })

// app.delete("/todos/:id", (request, response) => {
//     console.log("Delete a todo by ID: ", request.params.id);
// })

// module.exports = app;

