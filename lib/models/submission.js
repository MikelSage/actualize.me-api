const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const knex = require('knex')(configuration)

function count() {
  return knex('submissions').count('id')
}

function create(subInfo) {
  let newSubInfo = {
    user_id: subInfo.userId,
    github_url: subInfo.githubUrl,
    project_id: subInfo.projectId
  }
  return knex('submissions')
          .insert(newSubInfo)
          .returning(['id', 'github_url', 'project_id'])
}

module.exports = { count, create }
