const router = require('express').Router();
const userRoutes = require('./user-routes');
const fooditemRoutes = require('./fooditem-routes');

router.use('/users', userRoutes);
router.use('/fooditem', fooditemRoutes);

module.exports = router;
