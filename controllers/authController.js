const router = require('express').Router();
const User = require('../models/User.js');

router.get('/hello', (req, res) => {
    res.send('Hello, world');
});


router.post('/signup', async (req, res) => {
    console.log("signup route");
    try {
        const { username, password, passwordConfirm } = req.body;

        if (password !== passwordConfirm) {
            return res.status(400).json({ message: 'Passwords do not match. Please try again.' });
        }

        const existingUser = await User.findOne({ where: { username: req.body.username } });

        if (existingUser) {
            return res.status(400).json({ message: 'A user with this username already exists.' });
        }

        const newUser = await User.create({
            username,
            password,
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            return res.status(200).json({ message: 'Registration successful. Welcome to the Tech Blog!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
console.log(userData);
        if (!userData) {
            return res.status(400).json({ message: 'Incorrect username or password.' });
        }
console.log(req.body.password);
        const validPassword = await userData.checkPassword(req.body.password);
console.log(validPassword);
        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect username or password.' });
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in to Wallet Whiz!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;