require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const knex = require('knex')(configuration)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const _ = require('lodash');
const Project = require('./lib/models/Project');

app.use(passport.initialize())

passport.use(new LocalStrategy(
  (username, password, done) => {
    knex('users').where({username: username}).first()
    .then((user) => {
      if (!user) { done(null, false, {message: 'wrong username'}) }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false)
      } else {
        return done(null, user)
      }
    })
    .catch(err => done(err))
  }
))

app.locals.title = 'actualize-api'
app.set('port', process.env.PORT || 5000)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, PATCH, GET, DELETE, OPTIONS")
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/v1/current_projects', (request, response, next) => {
  let user_id = request.body['user_id']

  Project.currentProjects(user_id)
  .then((data) => {
    response.status(200).json(data.rows)
  })
})

app.get('/api/v1/projects/:id', (request, response, next) => {
  Project.find(request.params.id)
  .then((data) => {
    response.status(200).json(data[0])
  })
})

app.get('/api/v1/projects/:id/ungraded_subs', (request, response, next) =>{
  let project_id = request.params.id
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

  knex.raw(query, [project_id])
  .then((data) => {
    response.status(200).json(data.rows)
  })
})

app.get('/api/v1/projects/:id/areas', (request, response, next) => {
  let project_id = request.params.id
  let query = `select a.* from areas a
                 inner join project_areas pa on pa.area_id = a.id
                 where pa.project_id = ?
              `
  knex.raw(query, [project_id])
  .then((data) => {
    response.status(200).json(data.rows)
  })
})

app.post('/api/v1/scores', (request, response, next) => {
  let submission_id = request.body['sub_id']
  let area_id = request.body['area_id']
  let score = request.body['score']
  let query = `insert into scores (score, area_id, submission_id)
               values (?,?,?)
               returning id, score, area_id, submission_id
              `

  knex.raw(query, [score, area_id, submission_id])
  .then((data) => {
    response.status(201).json(data.rows[0])
  })
})

app.post('/api/v1/sessions', passport.authenticate('local', {session: false}),
  (request, response) => {
    let user_info = _.pick(request.user, ['id', 'role'])
    response.status(200).json(user_info)
  })

if (!module.parent) {
  app.listen(app.get('port'), () =>
    console.log(`${app.locals.title} is running on ${app.get('port')}`)
  )
}

module.exports = app
