const User = require("../model/usermodel");

async function loginUser(req, res) {
  try {
    const user = await User.find();

    if (!user) {
      res.status(200).send("User not found");
    }
    res.render("admin/viewlogin.ejs", { user: user });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function loginUserEdit(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(200).send("User not found");
    }
    res.render("admin/editlogin.ejs", { user });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function updateloginedit(req, res) {
  const userId = req.params.id;
  const updateData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  try {
 const updateUser = await User.findByIdAndUpdate(userId, updateData, {new: true});
 if(!updateUser){
  return res.status(404).send("User not found")
 }
 res.redirect('/userlogin')

  } catch (error) {
    res.status(400).send(error.message);
  }
}
// code for delete
async function logindelete(req,res){
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
   if (!user){
     res.status(200).send('User not found')
   } 
    
   res.status(200).redirect('/userlogin')
  
  } catch (error) {
    res.status(400).send(error.message)
  }
}



module.exports = {
  loginUser,
  loginUserEdit,
  updateloginedit,
  logindelete
};
