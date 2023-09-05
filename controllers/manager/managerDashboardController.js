const Product = require("../../model/productModel");
const Sale = require("../../model/saleModel");
const Category = require("../../model/categoryModel");

async function category(req, res) {
  try {
    const categories = await Category.find();

    res.render("manager/showcategory", { categories });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function managerCreateCategory(req, res) {
  try {
    const categoryName = req.body.name;

    const existingCategory = await Category.findOne({ name: categoryName });

    if (existingCategory) {
      return res.status(409).send("Category already exists");
    }

    const newCategory = new Category({ name: categoryName });
    await newCategory.save();
    res.status(200).redirect("/managercategory");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function editCategory(req, res) {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(200).send("category not found");
    }
    res.render("manager/editcategory", { category });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function managerUpdateCategory(req, res) {
  const categoryId = req.params.id;
  const newCategory = req.body.name;

  try {
    const updatecategory = await Category.findByIdAndUpdate(
      categoryId,
      { name: newCategory },
      { new: true }
    );
    if (!updatecategory) {
      res.status(200).send("Category not found");
    }
    return res.redirect("/managercategory");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// add product

async function managerCreateProduct(req, res) {
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
    res.status(200).redirect("/managercategory");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function managerShowProduct(req, res) {
  try {
    const categoryId = req.query.category;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(200).send("Category not found");
    }

    const products = await Product.find({ categoryId: categoryId });

    res.render("manager/showmanagerproduct.ejs", { category, products });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function managerProductDetail(req, res) {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).send("Product not found");
    }

    res.status(200).render("manager/managerproductdetail.ejs", { product });
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function editCategoryProduct(req, res) {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      res.status(200).send("product not found");
    }
    res
      .status(200)
      .render("manager/managereditcategoryproduct.ejs", { product });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function updatecategoryProduct(req, res) {
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

   return  res.redirect("/managercategory");
  } catch (error) {
    res.status(400).send(error.message);
  }
}


// product sidebar code
async function managerShowProduct(req,res){
  try {
    const products = await Product.find();

    res.status(200).render("manager/managershowallproduct.ejs", { products });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getManagerSale(req,res){
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    return res.render("manager/managersaleproduct.ejs", { product });
  } catch (error) {
    res.status(400).send(error.message);
  }
}


async function ManagerSaleProduct(req,res){
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


async function managerProductDetails(req,res){
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).send("Product not found");
    }

    res.status(200).render("manager/productdetail.ejs", { product });
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
 async function managerEditProduct(req,res){
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      res.status(200).send("product not found");
    }
    res
      .status(200)
      .render("manager/managersideeditproduct.ejs", { product });
  } catch (error) {
    res.status(400).send(error.message);
  }
 }
 
 async function managerUpdateProduct(req,res){
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

   return res.redirect("/managerproduct");
  } catch (error) {
    res.status(400).send(error.message);
  }
 }

 async function managershowsale(req,res){
  try {
    const sales = await Sale.find();

    return res.status(200).render("manager/managersalereport.ejs", { sales });
  } catch (error) {
    return res.status(400).send(error.message);
  }
 }


 async function showManagerSaleDetail(req,res){
  try {
    const saleId = req.params.id;

    const sale = await Sale.findById(saleId).populate("product");

    if (!sale) {
      return res.status(400).send("Sale not found");
    }
    res
      .status(200)
      .render("manager/managerSaledetails.ejs", { sale, product: sale.product });
  } catch (error) {
    res.status(400).send(error.message)
  }
 }

 async function managerEditSale(req,res){
  try {
    const saleId = req.params.id;

    const sale = await Sale.findById(saleId);

    if(!sale){
      res.status(200).send("product not found");
    }
    res.status(200).render('manager/managereditsale.ejs', {sale})
  } catch (error) {
    res.status(400).send(error.message);
  }
 }

 async function managerUpdateSale(req,res){
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

    res.redirect('/managershowsales');
  } catch (error) {
    res.status(400).send(error.message);
  }
 }



 async function managerSaleDelete(req,res){
  try {
    const saleId = req.params.id;
    const sale = await Sale.findByIdAndDelete(saleId);

    if (!sale) {
      res.status(200).send("sale not found");
    } else {
      res.status(200).redirect("/managershowsales");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
 }

 async function purchaseReport(req,res){
  try {
    const products = await Product.find();

    res.status(200).render("manager/managerpurchasereport.ejs", { products });
  } catch (error) {
    res.status(400).send(error.message);
  }
 }


 async function managerdeleteProduct(req,res){
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      res.status(200).send("product not found");
    } else {
      res.status(200).redirect("/managerpurchaseReport");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
 }

module.exports = {
  category,
  editCategory,
  managerUpdateCategory,
  managerCreateProduct,
  managerShowProduct,
  managerProductDetail,
  editCategoryProduct,
  updatecategoryProduct,
  managerCreateCategory,
  getManagerSale,
  ManagerSaleProduct,
  managerProductDetails,
  managerEditProduct,
  managerUpdateProduct,
  managershowsale,
  showManagerSaleDetail,
  managerEditSale,
  managerUpdateSale,
  managerSaleDelete,
  purchaseReport,
  managerdeleteProduct
};
