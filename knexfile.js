require("dotenv").config()
const pg = require("pg")

pg.defaults.ssl = true

module.exports = {
  development: {
    client: "pg",
    // connection: process.env.DATABASE_URL,
    connection:
      "postgres://bmsfcmsxbxptgt:1a9dae9aee447b32c2324af7bc118e2f77e096e2776280adfce76ec99b920cc4@ec2-107-21-201-238.compute-1.amazonaws.com:5432/d8rpts3ffvcvdf",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
}
