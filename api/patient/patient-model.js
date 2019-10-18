const db = require('../../data/dbConfig');

function get(tbl) {
  return db(tbl);
}
function findBy(tbl, filter) {
  return db(tbl)
    .where(filter)
    .first();
}

function findAllBy(tbl, filter) {
  return db(tbl).where(filter);
}
async function add(tbl, item) {
  await db(tbl)
    .insert(item)
    .returning('id');

  return get('patient');
}

async function remove(tbl, id) {
  await db(tbl)
    .where({ id })
    .del();
  return get('patient');
}

async function update(tbl, id, item) {
  await db(tbl)
    .where({ id })
    .update(item);
  return get('patient');
}

module.exports = {
  get,
  findBy,
  findAllBy,
  add,
  remove,
  update,
};
