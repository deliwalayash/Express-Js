const express=require('express')
const path=require('path')
const { engine } = require('express-handlebars');

const port =3000
const app=express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render('home');
});

app.use(express.static(path.join(__dirname , "static")))

app.use('/',require(path.join(__dirname,'routes/blog.js')))
// app.get('/',(req,res)=>{
//     res.sendFile()
// })
app.listen(port,()=>{
    console.log(`App is listening at ${port}`)
})

