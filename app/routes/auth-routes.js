const router = require('express').Router();
const { login, register, loginUser, registerUser, logout } = require('../controller/auth-controller');

router.get('/login', login);
router.get('/register', register);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logout);

module.exports = router;