// connect express
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")

// routes
const registration = require("./registration")
const user = require("./users")
const todo = require("./todo/todo-route.js")

// init express
const server = express()

// middleware
server.use(express.json()) // parse incoming request to json
server.use(helmet()) // helps secure your express by setting http headers
server.use(cors()) // cross-domain request sharing CORS
server.use(morgan("dev")) // debugging logger

// use routes
server.use("/api/auth", registration)
server.use("/api/user", user)
server.use("/api/todo", todo)

// index route display name
server.get("/", (req, res) => {
  res.status(200).json({ message: "HELLO WORLD🔥" })
})

module.exports = server
