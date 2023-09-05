const Category = require('../model/categoryModel');

async function createCategory(req, res) {
    try {
        const categoryName = req.body.name;
      
        // Check if a category with the same name already exists
        const existingCategory = await Category.findOne({ name: categoryName });
        
        if (existingCategory) {
            return res.status(409).send("Category already exists");
        }
        // Create and save the new category
        const newCategory = new Category({ name: categoryName });
        await newCategory.save();
        res.status(200).send("Category successfully created");
    } catch (error) {
        res.status(400).send(error.message);
    }
}


async function showcategory(req,res){
  try {
    const categories = await Category.find();

res.render('admin/showcategory', {categories})
  } catch (error) {
   res.status(400).send(error.message) 
  }  
}

// edit category
async function editcategory(req,res){
const categoryId = req.params.id;

try {
    const category = await Category.findById(categoryId);

    if(!category){
        res.status(200).send('category not found')
    }
    res.render('admin/editcategory', {category})

} catch (error) {
    res.status(400).send(error.message);
}}

async function updatecategory(req,res){
    const categoryId = req.params.id;
    const newCategory = req.body.name;

    try {
        const updatecategory = await Category.findByIdAndUpdate(categoryId, 
            {name: newCategory},
             {new: true})
        if(!updatecategory){
            res.status(200).send('Category not found')
        }
        res.redirect('/alladmincategory')
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    createCategory,
    showcategory,
    editcategory,
    updatecategory
}
