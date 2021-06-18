const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// get all posts for homepage
router.get('/', (req, res) => {
    try {
        console.log({id: req.session.user_id,
            loggedIn: req.session.loggedIn});
        res.render('homepage', {
            id: req.session.user_id,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one post by id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('generate-one-post', { post, loggedIn: req.session.loggedIn});
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');
});

router.get('*', async (req, res) => {
    try {
      res.render('404');
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
