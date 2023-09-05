const express = require('express');
const router = express.Router();
const path = require('path');
const satffPath = path.join(__dirname, '/public/views');
const staffController = require('../../controllers/staff/staffDashboardController');

router.get('/staffpanel', function(req,res){
    res.render('staff/staffdashboard.ejs');

})


router.get('/staffcategory', staffController.getstaffcategory)
router.get('/showcategoryproduct', staffController.showCategoryProduct)
router.get('/showcategoryproductdetails/:id' , staffController.showCategoryProductDetails)
router.get('/showproductdetail/:id', staffController.showproductdetail)


// prodcut 
router.get('/showproduct', staffController.showProduct);
router.get('/salestaffproduct/:id', staffController.saleProduct);
router.post('/salestaffproduct', staffController.showproductdetail);

// sales 
router.get('/staffsale', staffController.showSale);
router.get('/deletestaffsale/:id', staffController.deletestaffsale);
router.get('/staffsaledetails/:id', staffController.staffsaledetails);


// purchase 
router.get('/staffpurchaseReport', staffController.staffpurchaseReport)
router.get('/staffpurchasedetail/:id', staffController.staffpurchasedetail);
module.exports = router;
