const express=require('express')
const router=express.Router()
const path=require('path')
const users=require('../data.js')
const { error } = require('console')



router.get('/',(req,res)=>{
    res.render('main.ejs',{users:users})
})

router.get('/contact',(req,res)=>{
    res.render('contact',{error:null})
})
router.get('/login',(req,res)=>{
    res.render('login',{error:""})
})


const Contact = require('../models/Contact.js');

router.post('/contact', async (req, res) => {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
        return res.render("contact", { error: "All fields required" });
    }

    await Contact.create({ name, email, mobile });

    res.send("<h1>Contact Saved Successfully!</h1>");
});
const User = require('../models/User.js');

router.post('/login', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.render("login", { error: "All fields required" });
    }

    await User.create({ name, email, password });

    res.send("<h1>Login Saved Successfully!</h1>");
});


module.exports=router