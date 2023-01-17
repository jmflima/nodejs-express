const Product = require('../models/Product')

module.exports = class ProductController {
    static showProducts(req, res){
        res.render('products/all')
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static createProductPost(req, res) {
        const nome = req.body.nome
        const preco = req.body.preco
        const descricao = req.body.descricao

        const product = new Product(nome, preco, descricao)
        
        product.save()

        res.redirect('/products')
    }
}