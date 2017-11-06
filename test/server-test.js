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

    describe('GET /api/v1/current_projects', () => {
      it('should return all current projects', (done) => {
        let data = {user_id: 1}
        this.request.get('/api/v1/current_projects',
         {form: data},
         (err, res) => {
          if (err) { done(err) }

          let projects = JSON.parse(res.body)
          assert.equal(projects.length, 6)
          assert.equal(projects[0].name, 'Date Night')
          done()
        })
      })
    })

    describe('GET /api/v1/projects/:id/ungraded_subs', () => {
      it('returns ungraded submissions for a project', (done) => {
        this.request.get(`/api/v1/projects/${1}/ungraded_subs`,
        (err, res) => {
          if (err) { done(err) }

          let submissions = JSON.parse(res.body)
          let submission1 = submissions[0]
          let submission2 = submissions[1]

          assert.equal(submissions.length, 2)
          assert.equal(submission1.user.first_name, 'Mike')
          assert.equal(submission1.user.last_name, 'Heft')
          assert.isNull(submission1.scores[0])
          assert.equal(submission2.user.first_name, 'Katie')
          assert.equal(submission2.user.last_name, 'Keel')
          assert.isNull(submission2.scores[0])
          done()
        })
      })
    })

    describe('POST /api/v1/sessions', () => {
      it('should log a user in', (done) => {
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
