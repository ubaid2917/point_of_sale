const express = require('express');
const router = express.Router();
const path = require('path')


const admincategoryController = require('../controllers/admincategoryController');
const viewPath = path.join(__dirname, '/public/views');


router.get('/admincreatecategory', function(req,res){
    res.render('admin/admincategory.ejs')
})
router.post('/admincreatecategory' , admincategoryController.createCategory)
router.get('/alladmincategory', admincategoryController.showcategory)
router.get('/editadmincategory/:id', admincategoryController.editcategory)
router.post('/updatecategory/:id', admincategoryController.updatecategory);
module.exports = router;