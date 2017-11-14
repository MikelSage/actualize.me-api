const Project = require('../../models/project')

const index = (request, response, next) =>{
  Project.ungradedSubs(request.params.id)
  .then((data) => {
    response.status(200).json(data.rows)
  })
}

module.exports = { index }
