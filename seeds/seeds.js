
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),
    knex('posts').del(),
    knex('comments').del(),
    knex('categories').del(),

    // Inserts seed entries
    knex('users').insert({id: 2000, alias: "Jenny", photo: 'https://goo.gl/ISKmPE', email: 'testlo@test.com'}),
    knex('users').insert({id: 2001, photo: 'http://goo.gl/Wiw2c', email: 'test@test.com', alias: "Picard"}),
    knex('users').insert({id: 2002, photo: 'http://goo.gl/JUCPFY', email: 'calvin@abcglobal.edu', alias: 'Calvin'}),
    knex('categories').insert({technology: 'javascript'}),
    knex('categories').insert({technology: 'html'}),
    knex('posts').insert({id: 1000,user_id: 2000, title: "Why I'm so down to Earth and likeable", body: "I don't really know, I just try to stay grounded and, like, keep it real even though I've had so much success!"})
  );
};
