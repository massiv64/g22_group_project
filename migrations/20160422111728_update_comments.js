
exports.up = function(knex, Promise) {
  return knex.schema.table('comments', function(table){
    table.dropColumn('content');
    table.text('data');
    table.integer('vote_num');
    table.bigInteger('user_id').unsigned().index().references('id').inTable('users').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('comments', function(table){
    table.text('content');
    table.dropColumn('data');
    table.dropColumn('vote_num');
    table.dropColumn('user_id')
  })
};
