const express = require("express")
const server = express.Router()
const todoDb = require("./todo-model")
const errHelper = require("../errors/errHelper")

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
  } catch (err) {
    errHelper(500, err.errno || err, res)
  }
})

//-----------------------------------------------------------
// @route    /api/todo
// @desc     Add Todo
// @Access   Public
//-----------------------------------------------------------
server.post("/", async (req, res) => {
  const item = req.body
  if (!item.name) {
    return res.status(400).json({ message: "Name field is required" })
  }
  if (!item.message) {
    return res.status(400).json({ message: "Message field is required" })
  }

  try {
    console.log(item)
    const posted = await todoDb.add("todo", {
      name: item.name,
      message: item.message,
      completed: item.completed
    })
    console.log(posted)

    res.status(201).json(posted)
  } catch (err) {
    errHelper(500, err.errno || err, res)
  }
})

//-----------------------------------------------------------
// @route    /api/todo
// @desc    Update Todo Item
// @Access   Public
//-----------------------------------------------------------
server.put("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const exists = await todoDb.findBy("todo", { id })

    if (exists) {
      const updated = await todoDb.update("todo", id, req.body)
      res.json(updated)
    } else {
      return res
        .status(404)
        .json({ message: "Todo with that id does not exists" })
    }
  } catch (err) {
    errHelper(500, err.errno || err, res)
  }
})

//-----------------------------------------------------------
// @route    /api/todo
// @desc    Remove Todo
// @Access   Public
//-----------------------------------------------------------
server.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const exists = await todoDb.findBy("todo", { id })

    if (exists) {
      const deleted = await todoDb.remove("todo", id)
      res.json({ message: "sucessfully deleted todo" })
    } else {
      return res
        .status(404)
        .json({ message: "Todo with that id does not exists" })
    }
  } catch (err) {
    errHelper(500, err.errno || err, res)
  }
})
module.exports = server
