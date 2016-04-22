
exports.up = function(knex, Promise) {
  return knex.schema.table('posts', function(table){
    table.integer('is_answered');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', function(table){
    table.dropColumn('is_answered');
  })
};
