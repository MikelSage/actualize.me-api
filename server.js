require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const knex = require('knex')(configuration)

app.locals.title = 'actualize-api'
app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (request, response) => {
  response.send(process.env.USERNE)
})

app.get('/api/v1/current_projects', (request, response) => {
  let date = new Date

  response.
})

if (!module.parent) {
  app.listen(app.get('port'), () =>
    console.log(`${app.locals.title} is running on ${app.get('port')}`)
  )
}

module.exports = app
