const moment = require('moment');
const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('user_modules').del(),
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
}
