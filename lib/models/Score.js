const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const knex = require('knex')(configuration)

function count() {
  return knex('scores').count('id')
}

module.exports = {count};
