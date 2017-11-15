const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)

describe('Module Routes', () => {
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

  describe('GET /api/v1/modules', () => {
    it('returns all modules', (done) => {
      this.request.get('/api/v1/modules', (err, res) => {
        if (err) { done(err) }

        let modules = JSON.parse(res.body)
        let module1 = modules[0]

        assert.equal(modules.length, 2)
        assert.equal(module1.inning, 1705)
        assert.equal(module1.program, 'Backend')
        done()
      })
    })
  })
})
