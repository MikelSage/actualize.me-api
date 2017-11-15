const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)

describe('Areas Routes', () => {
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

  describe('GET /api/v1/areas', () => {
    it('returns all areas', (done) => {
      this.request.get('/api/v1/areas', (err, res) => {
        if (err) { done(err) }

        let areas = JSON.parse(res.body)
        let area1 = areas[0]

        assert.equal(areas.length, 3)
        assert.equal(area1.name, 'Functionality')
        assert.equal(area1.description, 'All base functionality is met')
        done()
      })
    })
  })
})
