exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', t=> {
    t.increments();
    t.integer('user_id').unsigned().index().references('users.id').onDelete('cascade');
    t.text('title');
    t.text('body');
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
