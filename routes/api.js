var express = require('express');
var router = express.Router();
let request = require('request');
const ApiController = require('../controllers/apiController');


router.get('/', function (req, res, next) {
    let apiController = new ApiController(req, res, next);
    apiController.dailyUpdate();
});

router.get('/fuelstation/:tipo', (req, res, next) => {
    let apiController = new ApiController(req, res, next);
    apiController.getFuelStation();
});

router.post('/reviews/add', (req, res, next) => {
    let apiController = new ApiController(req, res, next);
    apiController.saveReview();
});
router.get('/reviews/pending', (req, res, next) => {
    let apiController = new ApiController(req, res, next);
    apiController.getPendingReviews();
});
router.post('/reviews/validate', (req, res, next) => {
    let apiController = new ApiController(req, res, next);
    apiController.validateAll();
})
router.get('/reviews/:direccion', (req, res, next) => {
    let apiController = new ApiController(req, res, next);
    apiController.getReviews();
});


module.exports = router;
