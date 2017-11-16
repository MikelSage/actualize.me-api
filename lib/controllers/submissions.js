const Submission = require('../models/submission')

const create = (request, response, next) => {
  Submission.create(request.body)
  .then((data) => {
    response.status(201).json(data)
  })
}

module.exports = { create }
