const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const Score = require('../lib/models/score')

describe('Server', () => {
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

  it('should exist', () => {
    assert(app)
  })

  describe('routes', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
    })

    afterEach(() => {
      return knex.migrate.rollback()
    })

    describe('POST /api/v1/scores', () => {
      it('creates a score for that project', (done) => {
        let data = {sub_id: 1, area_id: 1, score: 4}
        Score.count()
        .then((data) => {
          assert.equal(data[0].count, 3)
        })

        this.request.post('/api/v1/scores', {form: data}, (err, res) => {
          if (err) { done(err) }

          let record = JSON.parse(res.body)

          assert.equal(record.score, data.score)
          assert.equal(record.area_id, data.area_id)
          assert.equal(record.submission_id, data.sub_id)
          Score.count()
          .then((data) => {
            assert.equal(data[0].count, 4)
          })
          done()
        })
      })
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
})
