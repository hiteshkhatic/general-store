require('dotenv').config()

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5501;

const categoryRoutes = require('./src/routes/categoryRoutes.js');

app.use('/category', categoryRoutes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));