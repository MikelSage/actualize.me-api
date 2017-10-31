
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('github_token')
    table.string('description')
    table.enu('role', ['student', 'instructor']).defaultTo(0)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.string('github_token')
    table.dropColumn('description')
    table.dropColumn('role')
  })
};
