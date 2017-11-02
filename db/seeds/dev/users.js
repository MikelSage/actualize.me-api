const moment = require('moment');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
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
          id: 1,
          module_id: 1,
          name: 'Date Night'
        },
        {
          id: 2,
          module_id: 1,
          name: 'Perilous Journey'
        },
        {
          id: 3,
          module_id: 1,
          name: 'Complete me'
        },
        {
          id: 4,
          module_id: 1,
          name: 'Enigma'
        },
        {
          id: 5,
          module_id: 1,
          name: 'Event Reporter'
        },
        {
          id: 6,
          module_id: 1,
          name: 'Black Thursday'
        },
        {
          id: 7,
          module_id: 2,
          name: 'Night Writer'
        }
      ])
    })
}
