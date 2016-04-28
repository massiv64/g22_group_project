
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),
    knex('posts').del(),
    knex('comments').del(),
    knex('categories').del(),
    knex('category_posts').del(),

    // Inserts seed entries
    knex('users').insert({id: 2000, alias: "Jenny", photo: 'https://goo.gl/ISKmPE', email: 'testlo@test.com'}),
    knex('users').insert({id: 2001, photo: 'http://goo.gl/Wiw2c', email: 'test@test.com', alias: "Picard"}),
    knex('users').insert({id: 2002, photo: 'http://goo.gl/JUCPFY', email: 'calvin@abcglobal.edu', alias: 'Calvin'}),
    knex('categories').insert({id: 1, technology: 'html'}),
    knex('categories').insert({id: 2, technology: 'css'}),
    knex('categories').insert({id: 3, technology: 'javascript'}),
    knex('categories').insert({id: 4, technology: 'react'}),
    knex('categories').insert({id: 5, technology: 'jQuery'}),
    knex('categories').insert({id: 6, technology: 'express'}),
    knex('categories').insert({id: 7, technology: 'jade'}),
    knex('posts').insert({id: 1000,user_id: 2000, title: "Why I'm so down to Earth and likeable", body: "I don't really know, I just try to stay grounded and, like, keep it real even though I've had so much success!"}),
    knex('category_posts').insert({id: 1, category_id: 1, post_id: 1000 })
  );
};
