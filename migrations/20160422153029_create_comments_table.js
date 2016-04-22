exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', t => {
    t.increments();
    t.integer('user_id').unsigned().index().references('users.id').onDelete('cascade');
    t.integer('post_id').unsigned().index().references('posts.id').onDelete('cascade');
    t.text('content');
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
