
exports.up = function(knex, Promise) {
  return knex.schema.table('modules', function(table) {
    table.dateTime('start_date')
    table.dateTime('end_date')
  })
} 

exports.down = function(knex, Promise) {
  return knex.schema.table('modules', function(table) {
    table.dropColumn('start_date')
    table.dropColumn('end_date')
  })
} 
