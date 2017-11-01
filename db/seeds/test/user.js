
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
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
}
