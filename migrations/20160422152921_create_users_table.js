
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (t) => {
    t.increments();
    t.text('photo');
    t.text('email').unique();
    t.text('password')
    t.text('token');
    t.text('alias');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
