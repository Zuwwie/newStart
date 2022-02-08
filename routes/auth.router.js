const router = require('express')
    .Router();

const authController = require('../controllers/auth.controller');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/refresh', authMiddleware.chekRefreshToken, authController.refreshtoken);//todo;

router.post('/login',
    userMiddleware.searchUserByEmail(true, true),
    authMiddleware.isPasswordTrue,
    authController.login);

router.delete('/delete',
    authMiddleware.checkAccessToken,
    authController.deleteAcc);

module.exports = router;
