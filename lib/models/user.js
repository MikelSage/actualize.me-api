const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const knex = require('knex')(configuration)

function findByUsername(username) {
  return knex('users').where({username: username}).first()
}

function averageScores(userId) {
  let query = `
    SELECT a.name, AVG(s.score) from users u
    INNER JOIN submissions sub ON u.id = sub.user_id
    INNER JOIN scores s ON s.submission_id = sub.id
    INNER JOIN areas a ON s.area_id = a.id
    WHERE u.id = ?
    GROUP BY a.name
  `
  return knex.raw(query, [userId])
}

module.exports = { findByUsername, averageScores }
