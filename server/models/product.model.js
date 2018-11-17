const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    image_url: {type: String, required: true},
});


//Exportar el modelo
module.exports = mongoose.model('Product', ProductSchema);