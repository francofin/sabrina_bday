// require express router method
const router = require("express").Router();

//require api routes
const apiRoutes = require('./api/');

// require home-routes
const homeRoutes = require('./home-routes');

// require dashboard routes
const dashboardRoutes = require('./dashboard-routes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);


module.exports = router;