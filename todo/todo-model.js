const db = require("../data/dbConfig")

function get(tbl) {
  return db(tbl)
}
function findBy(tbl, filter) {
  return db(tbl)
    .where(filter)
    .first()
}

function findAllBy(tbl, filter) {
  return db(tbl).where(filter)
}
async function add(tbl, item) {
  const [id] = await db(tbl)
    .insert(item)
    .returning("id")

  const newUser = await findBy("todo", { id })
  return newUser
}

function remove(tbl, id) {
  return db(tbl)
    .where({ id })
    .del()
}

async function update(tbl, id, item) {
  const updatedID = await db(tbl)
    .where({ id })
    .update(item)

  const updatedUser = await findBy("todo", { id: updatedID })
  return updatedUser
}

module.exports = {
  get,
  findBy,
  findAllBy,
  add,
  remove,
  update
}
