const { Pool } = require('pg');

const connectionString = 'postgres://postgres:1122@localhost:5432/tester';

const pool = new Pool({
  connectionString: connectionString
});
module.exports = pool;