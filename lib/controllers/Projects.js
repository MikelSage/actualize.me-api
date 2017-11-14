const Project = require('../models/Project')

const show = (request, response, next) => {
  Project.find(request.params.id)
  .then((data) => {
    response.status(200).json(data[0])
  })
}

module.exports = { show };
