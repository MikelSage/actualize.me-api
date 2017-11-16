const User = require('../../models/user')

const index = (request, response, next) => {
  User.averageScores(request.params.id).
  then((data) => {
    response.status(200).json(data.rows)
  })
}

module.exports = { index }
