
exports.up = function(knex, Promise) {
  return knex.schema.createTable('scores', function(table) {
    table.increments()
    table.integer('score')
    table.integer('area_id').unsigned().references('id').inTable('areas')
    table.integer('submission_id').unsigned().references('id').inTable('submissions')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('scores')
};
