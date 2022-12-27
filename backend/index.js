const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const connection = require('./connection/connect')
const cors = require('cors');
const productRoutes = require('./routes/productRoute');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use('/public', express.static('public'))
// app.use('/api', api)

app.use('/', productRoutes)

app.listen(process.env.PORT || 8000, ()=>console.log("app is listning on 8000 PORT"))
