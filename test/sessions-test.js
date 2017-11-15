const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)

describe('Sessions Routes', () => {
  before((done) => {
    this.port = 9876

    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err) }
      done()
    })

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    })
  })

  after(() => {
    this.server.close()
  })

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
  })

  afterEach(() => {
    return knex.migrate.rollback()
  })

  describe('POST /api/v1/sessions', () => {
    it('logs a user in', (done) => {
      let user_info = {username: 'johnyboi', password: 'pass'}

      this.request.post('/api/v1/sessions', {form: user_info}, (err, res) => {
        if (err) { done(err) }

        let user_response = JSON.parse(res.body)

        assert.equal(res.statusCode, 200)
        assert.hasAllKeys(user_response, ['id','role'])
        assert.equal(user_response.id, 1)
        assert.equal(user_response.role, 'instructor')
        done()
      })
    })
  })
})
