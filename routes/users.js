var express = require('express');
var router = express.Router();
const UserController = require('../controllers/usersController');

router.post('/login', function (req, res, next) {
    let userController = new UserController();
    userController.login(req, res, next);
});

router.post('/register', (req, res, next) => {
    let userController = new UserController();
    userController.register(req, res, next);
});

module.exports = router;