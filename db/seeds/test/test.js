const moment = require('moment');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      return knex('modules').del()
    })
    .then(function() {
      return knex('projects').del()
    })
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Johny',
          last_name: 'Appleseed',
          description: 'Something should definitely go here.',
          username: 'johnyboi',
          password: 'apples',
          role: 'instructor'
        },
        {
          id: 2,
          first_name: 'Mike',
          last_name: 'Heft',
          description: 'Best dude',
          username: 'hefty',
          password: 'password',
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
      return knex('projects').insert([
        {
          module_id: 1,
          name: 'Date Night'
        },
        {
          module_id: 1,
          name: 'Perilous Journey'
        },
        {
          module_id: 1,
          name: 'Complete me'
        },
        {
          module_id: 1,
          name: 'Enigma'
        },
        {
          module_id: 1,
          name: 'Event Reporter'
        },
        {
          module_id: 1,
          name: 'Black Thursday'
        },
        {
          module_id: 2,
          name: 'Night Writer'
        }
      ])
    })
}
