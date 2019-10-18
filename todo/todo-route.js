const express = require("express")
const server = express.Router()

//-----------------------------------------------------------
// @route    /api/todo
// @desc     Testing IF it's connected properly
// @Access   Public
//-----------------------------------------------------------
server.get("/", (req, res) => {
  console.log("hit")
  res.send("Testing /api/todo route if its connected properly")
})

module.exports = server
