const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

router.post('/login',
    userMiddleware.searchUserByEmail(true, true),
    authMiddleware.isPasswordTrue,
    authController.login); //todo

module.exports = router;
