const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const Submission = require('../lib/models/submission')

describe('Submissions Routes', () => {
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

  describe('POST /api/v1/submissions', () => {
    it('creates a new submission', (done) => {
      let subInfo = {
        userId: 3,
        githubUrl: 'https://github.com/MikelS/fake-proj',
        projectId: 2
      }

      Submission.count()
      .then((data) => {
        assert.equal(data[0].count, 6)
      })

      this.request.post('/api/v1/submissions', {form: subInfo}, (err, res) => {
        if (err) { done(err) }

        Submission.count()
        .then((data) => {
          assert.equal(data[0].count, 7)
        })

        done()
      })
    })
  })
})
