
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t){
    t.integer('verified');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t){
    t.dropColumn('verified');
  })
};
