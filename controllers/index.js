const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

router.get('*', async (req, res) => {
    try {
      res.render('404');
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
