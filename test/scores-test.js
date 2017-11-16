const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const Score = require('../lib/models/score')

describe('Scores routes', () => {
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
})
