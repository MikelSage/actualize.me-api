
exports.up = function(knex, Promise) {
  return knex.schema.createTable('project_areas', function(table) {
    table.increments('id').primary()
    table.integer('project_id').unsigned().references('id').inTable('projects')
    table.integer('area_id').unsigned().references('id').inTable('areas')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('project_areas')
};
