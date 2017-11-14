const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const knex = require('knex')(configuration)

function findByUsername(username) {
  return knex('users').where({username: username}).first()
}

module.exports = { findByUsername }
