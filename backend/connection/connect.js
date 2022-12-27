const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
mongoose.connect("mongodb://localhost:27017/productapi")
.then(console.log("api is connected to database"))
.catch((error)=>console.log(error))