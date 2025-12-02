const express= require('express')
const router=express.Router()
const Contact= require('../models/Contact')

router.get("/contact",async(req,res)=>{
    const contacts=await Contact.find()
    res.render("allContact",{contacts})
})
router.get("/",async(req,res)=>{
    const contacts=await Contact.find()
    res.render("allContact",{contacts})
})

router.get("/contact/add",(req,res)=>{
    res.render("addContact",{error:null})
})

router.post("/contact/add",async(req,res)=>{
    const {name,email,mobile}=req.body

    if(!name || !email || !mobile){
        return res.render("addContact",{error:"All field are required"})
    }

    await Contact.create({name,email,mobile})
    res.redirect("/contact")
})

router.get("/contact/edit/:id",async(req,res)=>{
    const contact =await Contact.findById(req.params.id)
   res.render("editContact",{contact})

})

router.post("/contact/edit/:id", async (req, res) => {
    const { name, email, mobile } = req.body;

    await Contact.findByIdAndUpdate(req.params.id, {
        name,
        email,
        mobile
    });

    res.redirect("/contact");
});

router.get("/contact/delete/:id", async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/contact")

});

module.exports = router;