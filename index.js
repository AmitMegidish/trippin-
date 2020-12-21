// Imports
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
require('./db');

// Middlewears
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', require('./routes/users'));
app.use('/vacations', require('./routes/vacations'));
app.use('/follow', require('./routes/follow'));

app.listen(1000, () => console.log("Server is up. Running on port 1000"));