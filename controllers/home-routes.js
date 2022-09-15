const router = require('express').Router();
const { User, FoodItem } = require('../models');
const { withAuth, withNoAuth } = require('../utils/auth');
const { Op } = require('sequelize');

// Route "/"

// Route "/login"

// TODO: Add a comment describing the functionality of the withAuth middleware
router.get('/', withAuth, async (req, res) => {
  try {

    const where = {
      user_id: {
        [Op.ne]: req.session.user_id,
      },
    };

    const { search_name } = req.query;

    if(search_name) {
      where.name = {
        [Op.like]: `%${search_name}%`
      };
    }

    const foodData = await FoodItem.findAll({
      where,
      include: {
        model: User,
        attributes: ['id', 'username'],
      },
    });

    const foodItems = foodData.map((foodItem) => foodItem.get({ plain: true }));

    res.render('homepage', {
      foodItems,
      searchName: search_name,
      // TODO: Add a comment describing the functionality of this property
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/myfridge', withAuth, async (req, res) => {

  const userData = await User.findByPk(req.session.user_id, {
    attributes: ['id','username'],
    include: FoodItem
  });

  const user = userData.toJSON();

  console.log(user);

  res.render('myfridge', {
    user,
    logged_in: req.session.logged_in,
  });
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
