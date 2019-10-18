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
function add(tbl, item) {
  return db(tbl)
    .insert(item)
    .returning("id")
}

function remove(tbl, id) {
  return db(tbl)
    .where({ id })
    .del()
}

function update(tbl, id, item) {
  return db(tbl)
    .where({ id })
    .update(item)
}

module.exports = {
  get,
  findBy,
  findAllBy,
  add,
  remove,
  update
}
