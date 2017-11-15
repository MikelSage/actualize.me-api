const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const knex = require('knex')(configuration)

function all() {
  return knex.select('*').from('modules')
}

module.exports = { all }
