exports.up = function(knex) {
  knex.schema.createTable("todo", function(tbl) {
    tbl.increments()
    tbl
      .string("name")
      .notNullable()
      .unique()
    tbl.string("message").notNullable()
    tbl.boolean("completed")
    tbl.timestamp("created").defaultTo(knex.fn.now())

    // Object example :
    // const exampleObject = {
    //   name: 'testing',
    //   message:'lorem ipsum',
    //   completed: false
    //   timestamp: '02/27/3019'
    // }
  })
}

exports.down = function(knex) {
  knex.schema.dropTableIfExists("todo")
}
