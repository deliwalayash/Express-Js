const express=require('express')
const router=express.Router()
const Contact = require('../model/contactSchema')


router.get('/',async(req,res)=>{
    const contacts = await Contact.find()
    res.render('index.ejs',{contact:contacts})
})
router.get('/add',(req,res)=>{
    res.render("form.ejs")
})

router.post('/add',async(req,res)=>{
    const body=req.body
    await Contact.create(body)
    res.redirect('/')
})

router.get('/delete/:id',async(req,res)=>{
    const deleteid=req.params.id
    await Contact.findByIdAndDelete(deleteid)
    res.redirect('/')
})

router.get('/edit/:id',async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    res.render('edit.ejs',{contact:contact})
})

router.post('/edit/:id',async(req,res)=>{
    await Contact.findByIdAndUpdate(req.params.id,req.body)
    res.redirect('/')    
})
module.exports = router