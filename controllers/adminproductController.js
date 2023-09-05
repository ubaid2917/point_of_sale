const Product = require("../model/productModel");
const Category = require("../model/categoryModel");
const Sale = require("../model/saleModel");

async function createProduct(req, res) {
  try {
    const body = {
      productName: req.body.productName,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.file ? req.file.filename : null,
      supplierName: req.body.supplierName,
      supplierEmail: req.body.supplierEmail,
      supplierNumber: req.body.supplierNumber,
      supplierAddress: req.body.supplierAddress,
      categoryId: req.body.categoryId,
    };
    //   console.log(req.body);
    const newProduct = new Product({
      productName: body.productName,
      description: body.description,
      quantity: body.quantity,
      price: body.price,
      image: body.image,
      supplierName: body.supplierName,
      supplierEmail: body.supplierEmail,
      supplierNumber: body.supplierNumber,
      supplierAddress: body.supplierAddress,
      categoryId: body.categoryId,
    });

    await newProduct.save();
    res.status(200).redirect("/alladmincategory");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function showAdminProduct(req, res) {
  try {
    const categoryId = req.query.category;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(200).send("Category not found");
    }

    const products = await Product.find({ categoryId: categoryId });

    res.render("admin/showadminproduct.ejs", { category, products });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function showProduct(req, res) {
  try {
    const products = await Product.find();

    res.status(200).render("admin/showallproduct.ejs", { products });
  } catch (error) {
    res.status(400).send(error.message);
  }
}


// edit and update product code 

async function editproduct(req,res){
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if(!product){
      res.status(200).send("product not found");
    }
    res.status(200).render('admin/admineditproduct.ejs', { product})
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function updateproduct(req,res){
  const productId = req.params.id;
  const {
    productName,
    description,
    quantity,
    price,
    image,
    supplierName,
    supplierEmail,
    supplierNumber,
    supplierAddress,
  } = req.body;

  try {
    const updateProduct = {
      productName,
      description,
      quantity,
      price,
      image,
      supplierName,
      supplierEmail,
      supplierNumber,
      supplierAddress,
    };
   
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateProduct,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(200).send("Product not found");
    }

    res.redirect('/adminproduct');
  } catch (error) {
    res.status(400).send(error.message);
  }
}


async function getproductDetails(req, res) {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).send("Product not found");
    }

    res.status(200).render("admin/adminproductdetails.ejs", { product });
  } catch (error) {
    return res.status(400).send(error.message);
  }
}





// admin sales code
async function getadminSale(req, res) {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("admin/adminsaleproduct.ejs", { product });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function saleAdminProduct(req, res) {
  try {
    const productId = req.body.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const newSale = new Sale({
      product: product._id,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      customerNumber: req.body.customerNumber,
      customerAddress: req.body.customerAddress,
      productName: product.productName,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
    });
    await newSale.save();
    return res.status(200).send("Successfully created sale");
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
async function showsaledetail(req, res) {
  try {
    const saleId = req.params.id;

    const sale = await Sale.findById(saleId).populate("product");

    if (!sale) {
      return res.status(400).send("Sale not found");
    }
    res
      .status(200)
      .render("admin/adminallsales.ejs", { sale, product: sale.product });
  } catch (error) {
    res.status(400).send(error.message)
  }
}




// sales reports

async function getsalereports(req, res) {
  try {
    const sales = await Sale.find();

    return res.status(200).render("admin/adminsalereport.ejs", { sales });
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function editsale(req,res){
  try {
    const saleId = req.params.id;

    const sale = await Sale.findById(saleId);

    if(!sale){
      res.status(200).send("product not found");
    }
    res.status(200).render('admin/admineditsale.ejs', {sale})
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function updatesale(req,res){
  const saleId = req.params.id;
  const {
    productName,
    description,
    quantity,
    price,
    customerName,
    customerEmail,
    customerNumber,
    customerAddress,
  } = req.body;

  try {
    const updateSale = {
      productName,
      description,
      quantity,
      price,
      customerName,
      customerEmail,
      customerNumber,
      customerAddress,
    };
   
    const updatedSale = await Sale.findByIdAndUpdate(
      saleId,
      updateSale,
      { new: true }
    );

    if (!updatedSale) {
      return res.status(200).send("Sale not found");
    }

    res.redirect('/getsalereports');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function saledelete(req, res) {
  try {
    const saleId = req.params.id;
    const sale = await Sale.findByIdAndDelete(saleId);

    if (!sale) {
      res.status(200).send("sale not found");
    } else {
      res.status(200).redirect("/getsalereports");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}


// purchase report code

async function purchaseReport(req, res) {
  try {
    const products = await Product.find();

    res.status(200).render("admin/adminpurchase.ejs", { products });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      res.status(200).send("product not found");
    } else {
      res.status(200).redirect("/purchaseReport");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}





module.exports = {
  createProduct,
  showAdminProduct,
  showProduct,
  getadminSale,
  saleAdminProduct,
  editsale,
  updatesale,
  saledelete,
  getsalereports,
  getproductDetails,
  showsaledetail,
  deleteProduct,
  purchaseReport,
  editproduct,
  updateproduct,
};
