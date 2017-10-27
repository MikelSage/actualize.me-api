const express = require('express')
const app = express()

app.locals.title = 'actualize-api'
app.set('port', process.env.PORT || 3000)


app.get('/', (request, response) => {
  response.send('It is secret')
})

if (!module.parent) {
  app.listen(app.get('port'), () =>
    console.log(`${app.locals.title} is running on ${app.get('port')}`)
  )
}

module.exports = app
