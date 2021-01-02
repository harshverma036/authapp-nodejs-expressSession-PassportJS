const router = require('express').Router();
const { ensureAuthenticate } = require('../../config/auth');
const { home, dashboard } = require('../controller/app-controller');

router.get('/', home);
router.get('/dashboard', ensureAuthenticate, dashboard)

module.exports = router; 