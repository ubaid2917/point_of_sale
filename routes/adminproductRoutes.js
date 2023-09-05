const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

router.use(express.static(path.join(__dirname, 'public')));


const adminproductController = require('../controllers/adminproductController');


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
  

  
//  admin product routes start
router.get('/admincreateproduct', function(req, res) {
    const categoryId = req.query.category;
    res.render('admin/adminproduct.ejs', { categoryId });
});
router.post('/admincreateproduct', upload.single("image"), adminproductController.createProduct);
router.get('/showadminproduct', adminproductController.showAdminProduct)
router.get('/adminproduct', adminproductController.showProduct)

//update products
router.get('/editproduct/:id', adminproductController.editproduct)
router.post('/updateproduct/:id', upload.single("image"), adminproductController.updateproduct)



// admin product sales routes start here
router.get('/saleadminproduct/:id', adminproductController.getadminSale)
router.post('/saleadminproduct', adminproductController.saleAdminProduct)
router.get('/productdetails/:id', adminproductController.getproductDetails)

// sales report routes
router.get('/getsalereports', adminproductController.getsalereports)
router.get('/showsaledetail/:id', adminproductController.showsaledetail)

// update sales code 
 
router.get('/editsale/:id', adminproductController.editsale)
router.post('/updatesale/:id', adminproductController.updatesale)
router.get('/saledelete/:id', adminproductController.saledelete)

// purchase repote code 
router.get('/purchaseReport', adminproductController.purchaseReport)
router.get('/productdelete/:id', adminproductController.deleteProduct)

module.exports = router;
