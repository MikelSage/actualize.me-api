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

function ungradedSubs(project_id) {
  let query =`select s.*, p.name as project_name,
                row_to_json(u.*) as user, json_agg(sc.*) as scores
                from submissions s
                inner join users u on s.user_id = u.id
                left join scores sc on sc.submission_id = s.id
                inner join projects p on p.id = s.project_id
                where p.id = ?
                group by s.id, u.id, p.id
                having json_agg(sc.*)::json->>0 is null
              `

  return knex.raw(query, [project_id])
}

function areas(project_id) {
  let query = `select a.* from areas a
                 inner join project_areas pa on pa.area_id = a.id
                 where pa.project_id = ?
              `
  return knex.raw(query, [project_id])
}

module.exports = {currentProjects, find, ungradedSubs, areas};
