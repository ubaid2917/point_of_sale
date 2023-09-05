const Staff  = require('../../model/categoryModel');
const Category = require('../../model/categoryModel');
const Product = require('../../model/productModel');
const Sale = require('../../model/saleModel')

async function getstaffcategory(req,res){
    try {
        const categories = await Category.find();
    
    res.render('staff/staffcategory', {categories})
      } catch (error) {
       res.status(400).send(error.message) 
      }
}

async function showCategoryProduct(req,res){
    try {
        const categoryId = req.query.category;
        const category = await Category.findById(categoryId);
        if (!category) {
          return res.status(200).send("Category not found");
        }
    
        const products = await Product.find({ categoryId: categoryId });
    
        res.render("staff/showstaffcategoryproduct.ejs", { category, products });
      } catch (error) {
        res.status(500).send(error.message);
      }
}

async function showCategoryProductDetails(req,res){
    try {
        const productId = req.params.id;
    
        const product = await Product.findById(productId);
    
        if (!product) {
          return res.status(400).send("Product not found");
        }
    
        res.status(200).render("staff/showproductdetail.ejs", { product });
      } catch (error) {
        return res.status(400).send(error.message);
      }
}


// show all product
async function showProduct(req,res){
    try {
        const products = await Product.find();
    
        res.status(200).render("staff/staffshowproduct.ejs", { products });
      } catch (error) {
        res.status(400).send(error.message);
      }
}

// sale product

async function saleProduct(req,res){
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("staff/showproductdetail.ejs", { product });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function saleStaffProduct(req,res){
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


async function showproductdetail(req,res){
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).send("Product not found");
    }

    res.status(200).render("staff/showproductdetail.ejs", { product });
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

// sales code
async function showSale(req,res){
  try {
    const sales = await Sale.find();

    return res.status(200).render("staff/showstaffsale.ejs", { sales });
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function deletestaffsale(req,res){
  try {
    const saleId = req.params.id;
    const sale = await Sale.findByIdAndDelete(saleId);

    if (!sale) {
      res.status(200).send("sale not found");
    } else {
      res.status(200).redirect("/staffsale");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}


async function staffsaledetails(req,res){
  try {
    const saleId = req.params.id;

    const sale = await Sale.findById(saleId).populate("product");

    if (!sale) {
      return res.status(400).send("Sale not found");
    }
    res
      .status(200)
      .render("staff/staffsaledetails.ejs", { sale, product: sale.product });
  } catch (error) {
    res.status(400).send(error.message)
  }
}


async function staffpurchaseReport(req,res){
  try {
    const products = await Product.find();

    res.status(200).render("staff/staffpurchase.ejs", { products });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function staffpurchasedetail(req,res){
  try{
  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(400).send("Product not found");
  }

  res.status(200).render("staff/showproductdetail.ejs", { product });
} catch (error) {
  return res.status(400).send(error.message);
}
}


module.exports = {
    getstaffcategory,
    showCategoryProduct,
    showCategoryProductDetails,
    showProduct,
    saleProduct,
    saleStaffProduct,
    showproductdetail,
    showSale,
    deletestaffsale,
    staffsaledetails,
    staffpurchaseReport,
    staffpurchasedetail,
}