const Product = require('../models/product.model');

//simple version
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


exports.product_create = function (req, res){
    let product = new Product (
        {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image_url: req.body.image_url
        }
    ); 

    product.save(function (err) {
        if (err){
            return next(err);
        }
        res.send('Product created successfully');
    })
};