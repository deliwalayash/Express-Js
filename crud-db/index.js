const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 4000;

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// DB CONNECT
mongoose.connect("mongodb://localhost:27017/CrudDb")
.then(() => console.log("Mongo Connected"))
.catch(err => console.log(err));

// ROUTES
const contactRoutes2 = require('./routes/contactRoutes');
app.use(contactRoutes2);

app.listen(port, () => console.log(`Server running on ${port}`));





