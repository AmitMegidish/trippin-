// Imports 
const router = require('express').Router();
const myQuery = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// routes
router.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, username, password } = req.body;
        const isUserExistsQuery = `SELECT username FROM users WHERE username = "${username}";`;

        if (!firstname || !lastname || !username || !password)
            return res.status(400).json({ err: true, msg: "All fields are required!" });

        const users = await myQuery(isUserExistsQuery);

        if (users.length)
            return res.status(400).json({ err: true, msg: "Username is not available" });

        const hash = await bcrypt.hash(password, 10);
        const insertUserQuery = `INSERT INTO users(first_name, last_name, username, password) VALUES ("${firstname}","${lastname}", "${username}", "${hash}");`;

        await myQuery(insertUserQuery);
        res.status(201).json({ err: false, msg: 'You have signed up successfully! You will now be redirected automatically in order to sign in.' });

    } catch (err) {
        res.status(500).json({ err: true, msg: err });
    }
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const isUserExistsQuery = `SELECT * FROM users WHERE username = "${username}"`;
    try {
        if (!username || !password)
            return res.status(400).json({ err: true, msg: "Missing information" });

        const user = await myQuery(isUserExistsQuery);

        if (!user.length)
            return res.status(400).json({ err: true, msg: "Wrong information" });

        const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

        if (!isPasswordCorrect)
            return res.status(400).json({ err: true, msg: "Wrong information" });

        const token = jwt.sign({ ...user[0], password: "Not again" }, process.env.TOKEN_SECRET);
        res.json({ err: false, msg: "Welcome to Trippin'! your dream vacation is now only a few clicks away.", token });
    } catch (err) {
        res.status(500).json({ err: true, msg: err });
    }
});

module.exports = router;