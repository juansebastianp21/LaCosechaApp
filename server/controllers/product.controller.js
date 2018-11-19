const Product = require('../models/product.model');


//simple version
exports.product_list = function (req, res, next) {
    Product.find(req.params.id, function (err, product) {
        if (err) return (err);
        res.json({
            products: product
        })
    });
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
            return (err);
        }
        res.json({
            message: 'Product created successfully'
        });
    })
};

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return (err);
        res.json({
            product: product
        });
    });
};

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return (err);
        res.json({
            message: 'Product udpated'
        });
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return err;
        res.json({
            message: 'Deleted successfully!'
        });
    })
};