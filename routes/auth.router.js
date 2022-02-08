const router = require('express')
    .Router();

const authController = require('../controllers/auth.controller');
const { authMiddleware, userMiddleware } = require('../middlewares');
const { REFRESH } = require('../configs/token-type.enum');

router.post('/refresh',
    authMiddleware.chekToken(REFRESH),
    authMiddleware.recordTokenPair,
    authController.refreshToken);

router.post('/login',
    userMiddleware.searchUserByEmail(true, true),
    authMiddleware.isPasswordTrue,
    authMiddleware.recordTokenPair,
    authController.login);

router.post('/logout',
    authMiddleware.chekToken(),
    authController.logout);

router.post('/logoutAll',
    authMiddleware.chekToken(),
    authController.logoutAll);

router.delete('/delete',
    authMiddleware.chekToken(),
    authController.deleteAcc);

module.exports = router;
