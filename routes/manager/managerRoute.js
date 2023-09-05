const express = require('express');
const router = express.Router();
const path = require('path');
const managerController = require('../../controllers/manager/managerDashboardController')
const multer = require('multer');
const viewPath = path.join(__dirname, '/public/views');



const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });


// admin router

router.get('/managerpanel', function(req, res) {
  res.render('manager/managerdashboard.ejs');
});


router.get('/managercreatecategory', function(req,res){
  res.render('manager/managercreatecategory.ejs');
})
router.post('/managercreatecategory', managerController.managerCreateCategory)

 router.get('/managercategory', managerController.category)
 router.get('/editCategory/:id', managerController.editCategory);
 router.post('/managerupdatecategory/:id', managerController.managerUpdateCategory);

 router.get('/managercreateproduct', function(req, res) {
  const categoryId = req.query.category;
  res.render('manager/managerproduct.ejs', { categoryId });
});
router.post('/managercreateproduct', upload.single("image"), managerController.managerCreateProduct);

router.get('/showmanagerproduct', managerController.managerShowProduct);
router.get('/managerproductdetail/:id', managerController.managerProductDetail);

router.get('/managereditproduct/:id', managerController.editCategoryProduct)
router.post('/managereditproduct/:id', upload.single("image"), managerController.updatecategoryProduct)



// products 
router.get('/managerproduct', managerController.managerShowProduct)
router.get('/managersaleproduct/:id', managerController.getManagerSale)
router.post('/managersaleproduct', managerController.ManagerSaleProduct)
router.get('/managerproductdetails/:id', managerController.managerProductDetails)

router.get('/managereditsideproduct/:id', managerController.managerEditProduct)
router.post('/managereditsideproduct/:id',upload.single("image"), managerController.managerUpdateProduct)


// sales 
router.get('/managershowsales', managerController.managershowsale);
router.get('/managershowsaledetail/:id', managerController.showManagerSaleDetail)

// edit and update 
router.get('/Managereditsale/:id', managerController.managerEditSale)
router.post('/Managerupdatesale/:id', managerController.managerUpdateSale)

// delete sale
router.get('/managersaledelete/:id', managerController.managerSaleDelete)


// purchase 
router.get('/managerpurchaseReport', managerController.purchaseReport)
router.get('/managerproductdelete/:id', managerController.managerdeleteProduct)
module.exports = router;