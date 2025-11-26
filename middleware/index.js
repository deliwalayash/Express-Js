const express = require('express')
const app = express()
const PORT = 5000

// Normal route
app.get('/', (req, res) => {
    res.send("Home page")
})

app.get('/err',(req,res,next)=>{
    next(new Error("Something Broke!!!"))
})
0
app.use((err,req,res,next)=>{
    console.log("Error Middlewear Called")
    res.status(500).send(err.message)
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
