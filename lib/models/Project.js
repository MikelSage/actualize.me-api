const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const knex = require('knex')(configuration)

function currentProjects(user_id) {
  let query = `select p.* from projects p
                 inner join modules m on p.module_id = m.id
                 inner join user_modules um on um.module_id = m.id
                 inner join users u on u.id = um.user_id
                 where m.start_date < now()
                 and m.end_date > now()
                 and u.id = ?
                 order by p.id
              `
  return knex.raw(query, [user_id])
}

function find(project_id) {
  return knex('projects').where({id: project_id})
}



module.exports = {currentProjects, find};
