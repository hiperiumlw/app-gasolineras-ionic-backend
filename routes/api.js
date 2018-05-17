var express = require('express');
var router = express.Router();
let request = require('request');
const ApiController = require('../controllers/apiController');


router.get('/', function(req, res, next) {
    let apiController =  new ApiController(req,res,next);
    apiController.dailyUpdate();
});

router.get('/fuelstation/:tipo',(req,res,next)=>{
    let apiController = new ApiController(req,res,next);
    apiController.getFuelStation();
})
module.exports = router;
