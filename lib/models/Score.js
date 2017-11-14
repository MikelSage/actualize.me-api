const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const knex = require('knex')(configuration)

function create(rawScore) {
  let submission_id = rawScore['sub_id']
  let area_id = rawScore['area_id']
  let score = rawScore['score']
  let query = `insert into scores (score, area_id, submission_id)
               values (?,?,?)
               returning id, score, area_id, submission_id
              `

  return knex.raw(query, [score, area_id, submission_id])
}

function count() {
  return knex('scores').count('id')
}

module.exports = {count, create}
