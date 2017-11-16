const Area = require('../models/area')

const index = (request, response, next) => {
  Area.all()
  .then((data) => {
    response.status(200).json(data)
  })
}

module.exports = { index }
