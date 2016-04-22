
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.dropColumn('username');
    table.text('photo');
    table.text('email');
    table.text('token');
    table.text('password');
    table.text('alias');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.text('username');
    table.dropColumn('photo');
    table.dropColumn('email').unique();
    table.dropColumn('token');
    table.dropColumn('password');
    table.dropColumn('alias');
  })
};
