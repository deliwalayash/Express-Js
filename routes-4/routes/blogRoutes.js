const express=require('express')
const router=express.Router()
let users=require('./blogs.js')
const path=require('path')
let upDateusers=users


router.get('/',(req,res)=>{
    res.render('index.ejs',{users:users})
})

router.get('/data',(req,res)=>{
    res.sendFile(path.join(__dirname,'./blogs.js'))
})
router.get('/delete/:id',(req,res)=>{
    const deleteid=req.params.id
    upDateusers=upDateusers.filter(i => i.id != Number(deleteid))
    res.render('index.ejs',{users:upDateusers})
})
router.get('/form',(req,res)=>{
    res.render('form.ejs')
})
router.get('/edit/:id',(req,res)=>{
    const editUserid=Number(req.params.id)
    const edituser=users.find(i => i.id ==editUserid)
    res.render('edit.ejs',{user:edituser})

})
router.post('/edit/:id',(req,res)=>{
    const editUserid=Number(req.params.id)
    const index=users.findIndex( i => i.id == editUserid)
    users[index].first_name=req.body.first_name
    users[index].last_name=req.body.last_name
    users[index].email=req.body.email
    res.redirect("/")
})



router.post('/form',(req,res)=>{
    const newUser={
        id:users.length+1,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    }
    users.push(newUser)
    res.redirect('/')
})

router.get('/showdata/:id',(req,res)=>{
    const showuserid=Number(req.params.id)
    const showuser=users.find(i => i.id ==showuserid)
    res.render('users.ejs',{user:showuser})
})
router.get('/data/:id',(req,res)=>{
    const id=req.params.id
    const myUser=users.find(i=>i.id == id )
    res.json(myUser)
})
module.exports=router