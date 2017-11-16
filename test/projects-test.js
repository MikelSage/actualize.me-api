const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const Project = require('../lib/models/project')

describe('Project Routes', () => {
    
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

  describe('GET /api/v1/current_projects', () => {
    it('returns all current projects', (done) => {
      let data = {user_id: 1}
      this.request.get(`/api/v1/current_projects?user_id=${1}`,
      (err, res) => {
        if (err) { done(err) }

        let projects = JSON.parse(res.body)
        assert.equal(projects.length, 6)
        assert.equal(projects[0].name, 'Date Night')
        done()
      })
    })
  })

  describe('GET /api/v1/projects/:id', () => {
    it('returns the correct project', (done) => {
      this.request.get('/api/v1/projects/1', (err, res) => {
        if (err) { done(err) }

        let project = JSON.parse(res.body)

        assert.equal(project.id, 1)
        assert.equal(project.name, 'Date Night')
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

        assert.equal(submissions.length, 4)
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

  describe('GET /api/v1/project/:id/areas', () => {
    it('returns the areas for a project', (done) => {
      this.request.get(`/api/v1/projects/${1}/areas`, (err, res) => {
        if (err) { done (err) }

        let areas = JSON.parse(res.body)

        assert.equal(areas.length, 3)
        assert.equal(areas[0].name, 'Functionality')
        done()
      })
    })
  })

  describe('POST /api/v1/projects', () => {
    it('creates a project record', (done) => {
      let projectData = {
        name: 'Buttership',
        description: 'Better than battleship by far',
        moduleId: 1,
        specUrl: 'www.google.com',
        areas: [1, 3]
      }

      Project.count().then((data) => {
        assert.equal(data[0].count, 7)
      })

      this.request.post('/api/v1/projects', {form: projectData}, (err, res) => {
        if (err) { done(err) }

        let newProject = JSON.parse(res.body)

        Project.count().then((data) => {
          assert.equal(data[0].count, 8)
        })

        done()
      })
    })
  })
})
