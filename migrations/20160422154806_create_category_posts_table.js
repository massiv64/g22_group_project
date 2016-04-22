exports.up = function(knex, Promise) {
  return knex.schema.createTable('category_posts', t => {
    t.increments();
    t.integer('catagory_id').unsigned().index().references('categories.id').onDelete('cascade');
    t.integer('post_id').unsigned().index().references('posts.id').onDelete('cascade');

  });  
};

exports.down = function(knex, Promise) {
  
};
