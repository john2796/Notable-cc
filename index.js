const server = require("./server")
const port = process.env.PORT || 4000

// 404
server.use((req, res) =>
  res.status(404).send({
    message: `[Route] --> ❓  ${req.url} ❓  <-- Not found. `
  })
)
// 500 - Any server error
server.use((err, req, res) => res.status(500).json({ error: err }))
server.listen(port, () => {
  console.log(`
-----------------------------------------------------------------------
                🔥  Server listening on port ${port}  🔥
-----------------------------------------------------------------------
    `)
})
