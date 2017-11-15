const Project = require('../../models/project')

const index = (request, response, next) => {
  let user_id = request.query['user_id']

  Project.currentProjects(user_id)
  .then((data) => {
    response.status(200).json(data.rows)
  })
}

module.exports = { index }
