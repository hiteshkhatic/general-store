const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

router.get('/readall', async ( _ ,res) => {
    try {
        const { rows } = await db.query('SELECT * FROM category;');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error while fetching');
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;