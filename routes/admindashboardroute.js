const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminDashboard');
const User = require('../model/usermodel');
const viewPath = path.join(__dirname, '/public/views');

// admin router

router.get('/adminpanel', function(req, res) {
  res.render('admin/admindashboard.ejs');
});

router.get('/userlogin', adminController.loginUser); 
  
router.get('/loginedit/:id', adminController.loginUserEdit); 
router.post('/updateloginedit/:id', adminController.updateloginedit);
router.get('/logindelete/:id', adminController.logindelete);
module.exports = router;
