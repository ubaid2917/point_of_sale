const express = require('express');
const router = express.Router();
const path = require('path');
const hbs = require("hbs");
//const auth = require('../middleware/auth');

const {registerUser} = require('../controllers/userController')
const {loginUser} = require('../controllers/userController')
const viewPath = path.join(__dirname, '/public/views');

// register router

router.get('/register', function(req,res){
res.render('register.hbs')
})
router.post('/register', registerUser)


// login Routes
router.get('/', function(req,res){
    res.render('login.hbs')
})

router.post('/login', loginUser)

module.exports = router;

