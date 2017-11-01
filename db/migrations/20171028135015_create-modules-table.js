
exports.up = function(knex, Promise) {
  return knex.schema.createTable('modules', function(table) {
    table.increments('id').primary()
    table.integer('inning')
    table.string('program')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('modules')
};
