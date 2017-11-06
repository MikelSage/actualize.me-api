const moment = require('moment');
const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('user_modules').del(),
    knex('project_areas').del(),
    knex('scores').del(),
    knex('submissions').del(),
    knex('areas').del(),
    knex('users').del(),
    knex('projects').del(),
    knex('modules').del()
  ])
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Johny',
          last_name: 'Appleseed',
          description: 'Something should definitely go here.',
          username: 'johnyboi',
          password: bcrypt.hashSync('pass', bcrypt.genSaltSync()),
          role: 'instructor'
        },
        {
          id: 2,
          first_name: 'Mike',
          last_name: 'Heft',
          description: 'Best dude',
          username: 'hefty',
          password: bcrypt.hashSync('pass', bcrypt.genSaltSync()),
          role: 'student'
        },
        {
          id: 3,
          first_name: 'Katie',
          last_name: 'Keel',
          description: 'Awesome Person',
          username: 'keel',
          password: bcrypt.hashSync('pass', bcrypt.genSaltSync()),
          role: 'student'
        },
        {
          id: 4,
          first_name: 'Matt',
          last_name: 'Devoe',
          description: 'Lethal Weapon',
          username: 'matt_d',
          password: bcrypt.hashSync('pass', bcrypt.genSaltSync()),
          role: 'student'
        }
      ])
    })
    .then(function() {
      return knex('modules').insert([
        {
          id: 1,
          inning: 1705,
          program: 'Backend',
          start_date: moment(),
          end_date: moment().add(40, 'days')
        },
        {
          id: 2,
          inning: 1706,
          program: 'Backend',
          start_date: moment().add(40, 'days'),
          end_date: moment().add(80, 'days')
        }
      ])
    })
    .then(function() {
      return knex('user_modules').insert([
        {
          id: 1,
          module_id: 1,
          user_id: 1
        },
        {
          id: 2,
          module_id: 1,
          user_id: 2
        },
        {
          id: 3,
          module_id: 2,
          user_id: 1
        }
      ])
    })
    .then(function() {
      return knex('projects').insert([
        {
          id: 1,
          module_id: 1,
          name: 'Date Night',
          description: 'Build a Binary Search Tree for a movie rater',
          spec_url: 'http://backend.turing.io/module1/projects/date_night'
        },
        {
          id: 2,
          module_id: 1,
          name: 'Perilous Journey',
          description: 'Learn linked lists on the Oregon Trail',
          spec_url: 'http://backend.turing.io/module1/projects/perilous_journey'
        },
        {
          id: 3,
          module_id: 1,
          name: 'Complete me',
          description: 'Learn tries by building out an autocomplete app',
          spec_url: 'http://backend.turing.io/module1/projects/complete_me'
        },
        {
          id: 4,
          module_id: 1,
          name: 'Enigma',
          description: 'Be a total codebreaker or something',
          spec_url: 'http://backend.turing.io/module1/projects/enigma'
        },
        {
          id: 5,
          module_id: 1,
          name: 'Event Reporter',
          description: 'Learn to handle CSVs like a real reporter',
          spec_url: 'http://backend.turing.io/module1/projects/event_reporter'
        },
        {
          id: 6,
          module_id: 1,
          name: 'Black Thursday',
          description: 'Build your own really slow database in Ruby!',
          spec_url: 'http://backend.turing.io/module1/projects/black_thursday'
        },
        {
          id: 7,
          module_id: 2,
          name: 'Credit Check',
          description: 'Intro to algorithms with yo boy Luhn',
          spec_url: 'http://backend.turing.io/module1/projects/credit_check'
        }
      ])
    })
    .then(function() {
      return knex('submissions').insert([
        {
          id: 1,
          user_id: 2,
          github_url: 'http://www.github.com/nope/not_real',
          project_id: 1
        },
        {
          id: 2,
          user_id: 3,
          github_url: 'http://www.github.com/nope/not_real',
          project_id: 1
        },
        {
          id: 3,
          user_id: 2,
          github_url: 'http://www.github.com/nope/not_real',
          project_id: 2
        },
        {
          id: 4,
          user_id: 4,
          github_url: 'http://www.github.com/nope/not_real',
          project_id: 1
        }
      ])
    })
    .then(function() {
      return knex('areas').insert([
        {
          id: 1,
          name: 'Functionality',
          description: 'All base functionality is met'
        },
        {
          id: 2,
          name: 'Test-Driven Development',
          description: 'All Methods are tested and tests follow Ruby syntax and style'
        },
        {
          id: 3,
          name: 'Ruby Syntax and Style',
          description: 'Student follows Ruby Syntax and Style'
        }
      ])
    })
    .then(function() {
      return knex('project_areas').insert([
        {
          id: 1,
          project_id: 1,
          area_id: 1
        },
        {
          id: 2,
          project_id: 1,
          area_id: 2
        },
        {
          id: 3,
          project_id: 1,
          area_id: 3
        },
        {
          id: 4,
          project_id: 2,
          area_id: 1
        },
        {
          id: 5,
          project_id: 2,
          area_id: 3
        }
      ])
    })
    .then(function() {
      return knex('scores').insert([
        {
          id: 1,
          score: 3,
          area_id: 1,
          submission_id: 4
        },
        {
          id: 2,
          score: 4,
          area_id: 2,
          submission_id: 4
        },
        {
          id: 3,
          score: 3,
          area_id: 3,
          submission_id: 4
        }
      ])
    })
}
