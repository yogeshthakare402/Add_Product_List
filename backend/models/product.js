const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String },
    productDescription: { type: String },
    productPrice: { type: Number },
    productCategory: { type: String },
    uploadImages: { type: Array }
})

module.exports = mongoose.model("Product", productSchema)