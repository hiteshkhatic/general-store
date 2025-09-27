const db = require('./src/config/db.js');

async function getTables() {
    try {
        const result = await db.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\';');
        console.log('connected to database and found tables: ', result.rows);
    } catch (error) {
        console.error('Database query error', err);
    }
}

getTables();