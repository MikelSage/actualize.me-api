require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('./lib/models/user')
const Controllers = require('./lib/controllers')

app.use(passport.initialize())

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findByUsername(username)
    .then((user) => {
      if (!user) { done(null, false) }
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
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "POST, PATCH, GET, DELETE, OPTIONS")
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/v1/current_projects', Controllers.CurrentProjects.index)

app.get('/api/v1/projects/:id', Controllers.Projects.show)

app.get('/api/v1/projects/:id/ungraded_subs', Controllers.UngradedSubs.index)

app.get('/api/v1/projects/:id/areas', Controllers.ProjectAreas.index)

app.post('/api/v1/scores', Controllers.Scores.create)

app.post('/api/v1/sessions',
         passport.authenticate('local', {session: false}),
         Controllers.Sessions.create)

if (!module.parent) {
  app.listen(app.get('port'), () =>
    console.log(`${app.locals.title} is running on ${app.get('port')}`)
  )
}

module.exports = app
