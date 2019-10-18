exports.up = function(knex, Promise) {
  return knex.schema.createTable("todo", function(tbl) {
    tbl.increments()
    tbl
      .string("name")
      .notNullable()
      .unique()
    tbl.string("message").notNullable()
    tbl.boolean("completed").defaultTo(false)
    tbl.timestamps(true, true)

    // Object example :
    // const exampleObject = {
    //   name: 'testing',
    //   message:'lorem ipsum',
    //   completed: false
    //   timestamp: '02/27/3019'
    // }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("todo")
}
