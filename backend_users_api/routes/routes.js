var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require('../controllers/UserController');
const User = require("../models/User");
var AdminAuth = require('../middleware/AdminAuth')

router.get('/', HomeController.index);

router.post('/user', UserController.create)

router.get('/user', UserController.index)
router.get('/user/:id', UserController.findUser)

router.put('/user', UserController.edit)
router.delete('/user/:id', UserController.delete)

router.post('/recoverPassword', UserController.recoverPassword)
router.post('/changePassword',UserController.changePassword)

router.post('/login', UserController.login)
router.post('/validate', HomeController.validate)
module.exports = router;