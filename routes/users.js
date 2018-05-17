var express = require('express');
var router = express.Router();
const UserController = require('../controllers/usersController');

router.get('/login', function(req, res, next) {
      let userController =  new UserController(req,res,next);
      userController.login();
  });
  
  router.post('/register',(req,res,next)=>{
      let userController = new UserController(req,res,next);
      userController.register();
  })

module.exports = router;