//app.js

const express = require('express');
const bodyParser = require('body-parser');

//importacion de las rutas para los productos
const product = require('./routes/product.route'); 
// inicialización de la aplicación de express
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);




//Configuracio de la base de datos de mongoose
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://user:product1234@ds143511.mlab.com:43511/products';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



let port = 3000;
app.listen(port, ()=> {
    console.log('server is up and running on port number ' + port);
});