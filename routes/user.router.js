const router = require('express').Router();

const userController = require('../controllers/user.controller')

router.get('/', userController.getUsers);

router.get('/:user_id', userController.getUserById);

router.post('/', userController.createUser);

module.exports = router;
