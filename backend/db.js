
const { Pool } = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "1997",
    port: 5435,
    database: "devi",
});




module.exports=pool;