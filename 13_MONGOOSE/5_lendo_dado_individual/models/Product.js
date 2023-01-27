const mongoose = require('mongoose')
const { Schema } = mongoose

const Product = mongoose.model(
    'Product',
    new Schema({
        nome: {type: String, required: true},
        preco: {type: Number, required: true},
        descricao: {type: String, required: true},
        imagem: {type: String, required: true}
    }),
)

module.exports = Product
