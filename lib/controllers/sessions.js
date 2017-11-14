const _ = require('lodash')

const create = (request, response) => {
  let user_info = _.pick(request.user, ['id', 'role'])
  response.status(200).json(user_info)
}

module.exports = { create }
