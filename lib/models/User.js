const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const knex = require('knex')(configuration)

function findByUsername(username) {
  return knex.raw('SELECT * FROM users WHERE username=?', [username])
}
