exports.up = knex => knex.schema.createTable('patient', (tbl) => {
  // Appointments should have a unique ID,
  // patient first name, patient last name, date & time, and kind (New Patient or Follow-up).
  tbl.increments();
  tbl.string('firstName').notNullable();
  tbl.string('lastName').notNullable();
  tbl.string('kind').notNullable();
  tbl.string('time');
  tbl
    .integer('doctor_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('doctors')
    .onDelete('restrict');
});

exports.down = knex => knex.schema.dropTableIfExists('patient');
