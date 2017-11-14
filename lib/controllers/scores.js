const Score = require('../models/score')

const create = (request, response, next) => {
  Score.create(request.body)
  .then((data) => {
    response.status(201).json(data.rows[0])
  })
}

module.exports = { create }
