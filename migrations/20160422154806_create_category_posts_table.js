exports.up = function(knex, Promise) {
  return knex.schema.createTable('category_posts', t => {
    t.increments();
    t.integer('category_id').unsigned().index().references('categories.id').onDelete('cascade');
    t.integer('post_id').unsigned().index().references('posts.id').onDelete('cascade');

  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('category_posts');
};
