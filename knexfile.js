// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'stack_app'
    },
    pool: {
      min: 1,
      max: 1
    },
    debug: true,
    migrations: {
        directory: './migrations'
    }
  },
  test: {
   client: 'postgresql',
   connection: {
     database: 'stack_app-test'
   },
     pool: {
     min: 1,
     max: 2
   },
   debug:true
 },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
