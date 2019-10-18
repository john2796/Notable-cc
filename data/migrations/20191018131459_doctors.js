exports.up = knex => knex.schema.createTable('doctors', (tbl) => {
  //   Doctors should
  // have a unique ID, a first name, and a last name.
  tbl.increments();
  tbl.string('firstName').notNullable();
  tbl.string('lastName').notNullable();
});

exports.down = knex => knex.schema.dropTableIfExists('doctors');
