const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1',
  database: 'hackatec'
})

const DB = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}

module.exports = { DB }
