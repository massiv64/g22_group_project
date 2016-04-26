
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert({id: 2000, alias: "Jenny", photo: 'https://goo.gl/ISKmPE', email: 'testlo@test.com'}),
    knex('users').insert({id: 2001, photo: 'http://goo.gl/Wiw2c', email: 'test@test.com', alias: "Picard"}),
    knex('users').insert({id: 2002, photo: 'http://goo.gl/JUCPFY', email: 'calvin@abcglobal.edu', alias: 'Calvin'})
  );
};
