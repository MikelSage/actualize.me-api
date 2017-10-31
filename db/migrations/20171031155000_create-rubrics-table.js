
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', function(table) {
    table.increments().primary()
    table.string('name')
    table.string('description')
    table.string('spec_url')
    table.integer('module_id').unsigned().references('id').inTable('modules')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('projects')
};
