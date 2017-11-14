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
const _ = require('lodash')
const Project = require('./lib/models/Project')
const Score = require('./lib/models/Score');

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
  Project.ungradedSubs(request.params.id)
  .then((data) => {
    response.status(200).json(data.rows)
  })
})

app.get('/api/v1/projects/:id/areas', (request, response, next) => {
  Project.areas(request.params.id)
  .then((data) => {
    response.status(200).json(data.rows)
  })
})

app.post('/api/v1/scores', (request, response, next) => {
  Score.create(request.body)
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
