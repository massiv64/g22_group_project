const env = process.env.DATABASE_URL || 'development'
const config = require("../knexfile")[env];
module.exports = require('knex')(config);
