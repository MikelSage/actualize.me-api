
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_modules', function(table) {
    table.increments('id').primary()
    table.integer('user_id').unsigned().references('id').inTable('users')
    table.integer('module_id').unsigned().references('id').inTable('modules')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_modules')
};
