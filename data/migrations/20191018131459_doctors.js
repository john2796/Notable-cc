exports.up = knex => knex.schema.createTable('doctors', (tbl) => {
  tbl.increments();
  tbl.string('firstName').notNullable();
  tbl.string('lastName').notNullable();
});

exports.down = knex => knex.schema.dropTableIfExists('doctors');
