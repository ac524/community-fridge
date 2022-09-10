const router = require('express').Router();
const { User } = require('../models');
const { withAuth, withNoAuth } = require('../utils/auth');

// Route "/"

// Route "/login"

// TODO: Add a comment describing the functionality of the withAuth middleware
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] }
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // TODO: Add a comment describing the functionality of this property
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', withNoAuth, (req, res) => {
  res.render('login');
});

router.get('/signup', withNoAuth, (req, res) => {
  res.render('signup');
});

module.exports = router;


// Route "/dashboard"

// Route "/dashboard/new"

// Route "/dashboard/edit/:id"

// Route "/post/:id"