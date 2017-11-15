const Module = require('../models/module')

const index = (request, response, next) => {
  Module.all()
  .then((data) => {
    response.status(200).json(data)
  })
}

module.exports = { index }
