const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const knex = require('knex')(configuration)
const Score = require('../models/Score');

const create = (request, response, next) => {
  Score.create(request.body)
  .then((data) => {
    response.status(201).json(data.rows[0])
  })
}

module.exports = { create }
