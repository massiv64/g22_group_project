
exports.up = function(knex, Promise) {
  return knex.schema.table('posts', function(table){
    table.bigInteger('cat_post_id').unsigned().index().references('id').inTable('cat_post').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', function(table){
    table.dropColumn('cat_post_id');
  })
};
