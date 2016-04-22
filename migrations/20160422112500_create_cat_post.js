
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cat_post', function(table){
    table.bigInteger('user_id').unsigned().index().references('id').inTable('users').onDelete('cascade');
    table.increments();
    table.bigInteger('post_id').unsigned().index().references('id').inTable('posts').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cat_post');
};
