const express=require('express')
const app=express()
const port = 4000
let data=require('./data')

app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")
app.get('/',(req,res)=>{
    res.render('home',{name:"yash",age:36,surname:"deliwala"})
})
app.get('/data/register',(req,res)=>{
    res.render('register')
})
app.get('/data',(req,res)=>{
    res.render('data',{data:data})
})

app.post('/register',(req,res)=>{
    console.log(req.body)
    res.send("Form received")
})

app.get('/data/:id',(req,res)=>{
    const deleteid=req.params.id
    data=data.filter(i => i.id != deleteid)
    res.render('data',{data:data})
})

app.get('/login',(req,res)=>{
    res.render('login',{error:null})
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        error: null,
        username: "",
        email: "",
        mobile: ""
    });
});


app.post('/login',(req,res)=>{
    const {username,email,password}=req.body

    if(!username || !email || !password){
        return res.render('login',{
            error:"All Field Are Required!",
            username,
            email
        })
    }

    if(!email.includes("@")){
        return res.render('login',{
            error:"Email is Required",
            username,
            email
        })
    }

    if(password.length < 6){
        return res.render('login',{
            error:"Password 6 digits Required",
            username,
            email
        })
    }

    res.send("login received")
})


app.post('/contact', (req, res) => {
    const { username, email, mobile } = req.body;

    if (!username || !email || !mobile) {
        return res.render("contact", {
            error: "All fields are required!",
            username,
            email,
            mobile
        });
    }

    if (!email.includes("@")) {
        return res.render("contact", {
            error: "Email is invalid!",
            username,
            email,
            mobile
        });
    }

    if (mobile.length !== 10) {
        return res.render("contact", {
            error: "Mobile number must be 10 digits!",
            username,
            email,
            mobile
        });
    }

    res.send("Contact Form Received 😄");
});


app.use(express.static("public"))


app.listen(port,()=>{
    console.log(`Port is lintening to ${port}`)
})