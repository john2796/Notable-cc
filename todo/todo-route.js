const express = require("express")
const server = express.Router()
const todoDb = require("./todo-model")

// Things todo :
// Make a Todo app to practice

//-----------------------------------------------------------
// @route    /api/todo
// @desc     get todo
// @Access   Public
//-----------------------------------------------------------
server.get("/", async (req, res) => {
  try {
    const todos = await todoDb.get("todo")
    res.json(todos)
  } catch ({ message }) {
    res.status(500).json(message)
  }
})

//-----------------------------------------------------------
// @route    /api/todo
// @desc     Add Todo
// @Access   Public
//-----------------------------------------------------------
server.post("/", async (req, res) => {
  const item = req.body
  try {
    console.log(item)
    const posted = await todoDb.add("todo", { item })
    console.log(posted)

    res.status(201).json(posted)
  } catch ({ message }) {
    res.status(500).json(message)
  }
})

module.exports = server
