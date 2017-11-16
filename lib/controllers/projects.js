const Project = require('../models/project')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const knex = require('knex')(configuration)

const show = (request, response, next) => {
  Project.find(request.params.id)
  .then((data) => {
    response.status(200).json(data[0])
  })
}

const create = (request, response, next) => {
  Project.create(request.body)
  .then((newProject) => {
    let projAreas = request.body.areas.map((areaId) => {
      return {project_id: newProject.id, area_id: areaId}
    })

    return knex('project_areas').insert(projAreas)
  })
  .then((data) => {
    response.status(201).json(data)
  })
}

module.exports = { show, create }
