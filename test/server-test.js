const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)

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

    // describe('GET /api/v1/:rubric_id/submissions', (done) => {
    //   this.request.get('/api/v1/1/submissions', (error, response) => {
    //     if (error) { done(error) }
    //
    //     let submissions = JSON.parse(response.body)
    //     assert.equal(submissions.length, 3)
    //
    //   })
    // })

    describe('GET /api/v1/current_projects', () => {
      it('should return all current projects', (done) => {
        let data = {user_id: 1}
        this.request.get('/api/v1/current_projects', {form: data}, function(err, res) {
          if (err) { done(err) }

          let projects = JSON.parse(res.body)
          assert.equal(projects.length, 6)
          assert.equal(projects[0].name, 'Date Night')
          done()
        })
      })
    })
  })
})
