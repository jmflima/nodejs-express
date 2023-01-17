const Product = require('../models/Product')

module.exports = class ProductController {
    static async showProducts(req, res){
        const products = await Product.getProducts()

        res.render('products/all', { products })
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static createProductPost(req, res) {
        const nome = req.body.nome
        const imagem = req.body.imagem
        const preco = req.body.preco
        const descricao = req.body.descricao

        const product = new Product(nome, imagem, preco, descricao)
        
        product.save()

        res.redirect('/products')
    }
}