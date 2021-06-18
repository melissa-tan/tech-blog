const router = require('express').Router();
const User = require('../../models/User');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Username' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.loggedIn = false;
        req.session.destroy((error) => {
            if (error) {
                console.log(error);
                res.status(404).end();
            } else {
                console.log("logged out");
                res.status(200).json('Logged out')
            }
        })
    } else {
        res.status(404).end();
    }
});



module.exports = router;
