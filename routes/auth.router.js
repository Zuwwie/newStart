const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/login',
    userMiddleware.searchUserByEmail(true, true),
    authMiddleware.isPasswordTrue,
    authController.login);

module.exports = router;
