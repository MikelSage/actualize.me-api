
exports.up = function(knex, Promise) {
  return knex.schema.createTable('submissions', function(table) {
    table.increments()
    table.string('notes')
    table.string('github_url')
    table.integer('user_id').unsigned().references('id').inTable('users')
    table.integer('project_id').unsigned().references('id').inTable('projects')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('submissions')
};
