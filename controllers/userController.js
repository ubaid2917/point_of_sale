const express= require('express');
const bcryptjs = require('bcryptjs');
const User = require('../model/usermodel');
const jwt = require("jsonwebtoken")
const config = require('../config/config');

const create_token = async (id)=>{
    try {
      const token = await jwt.sign({_id: id},config.secret_jwt)
      return token;
    } catch (error) {
        throw new Error(error.message)
    }
}


async function securepassword(password){
    try {
        const passwordHash = await bcryptjs.hash(password, 10);
        return passwordHash
    } catch (error) {
       throw new Error(error.message); 
    }
}
async function registerUser(req,res){
    try {
        const allowedEmail = ['admin@gmail.com', 'manager@gmail.com', 'staff@gmail.com'];
        const email = req.body.email;
       console.log(email);
        if(!allowedEmail.includes(email)){
            return res.status(200).json({error: 'Invalid email'})
        }
        
        let role = '';
        if(email === 'admin@gmail.com'){
            role = 'admin';
        }else if(email === 'manager@gmail.com'){
            role = 'manager';
        }else if(email === 'staff@gmail.com'){
            role = 'staff';
        }

        const password = req.body.password;

        const spassword = await securepassword(password)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: spassword,
            role: role,
        })

        await user.save()
        res.status(200).json({success: true, message: 'user successfully registered'})
    } catch (error) {
        res.status(400).send(error.message)
    }
}



// login function   
async function loginUser(req,res){
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email: email})
        if(user){
            const passwordMatch = await bcryptjs.compare(password, user.password);
            if(passwordMatch){
              const tokenData = await create_token(user._id) 
             const userResult = {
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
                token: tokenData
             }
             if(userResult){
                if(user.role === 'admin'){
               return res.redirect('/adminpanel')
                }else if(user.role === 'manager'){
                    return res.redirect('/managerpanel')
                }else if(user.role === 'staff'){
                    return res.redirect('/staffpanel')
                }
            }
            }else{
                res.status(200).send("Invalid creditentials");
         }
        }else{
            res.status(200).send("Invalid creditentials");

        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = {
    registerUser,
    loginUser,
}