const Product = require('../models/Product')

module.exports = class ProductController {
    static async showProducts(req, res){
        const products = await Product.find().lean()
        res.render('products/all', { products })
    }

    // chama a tela de inclusão
    static createProduct(req, res) {
        res.render('products/create')
    }

    static async createProductPost(req, res) {
        const nome = req.body.nome
        const imagem = req.body.imagem
        const preco = req.body.preco
        const descricao = req.body.descricao

        const product = new Product({nome, imagem, preco, descricao})
        
        //executa a função save() do mongoose
        await product.save()

        res.redirect('/products')
    }

    static async getProduct(req, res) {
        const id = req.params.id

//executa a função de dados findById do mongoose
        const product = await Product.findById(id).lean()
        res.render('products/product', { product })
    }

    static async editProduct(req, res) {
       const id = req.params.id

//executa a função de dados findById do mongoose
       const product = await Product.findById(id).lean()
       res.render('products/edit', { product })
    }

    static async editProductPost(req, res){
        const id = req.body.id
        const nome = req.body.nome
        const imagem = req.body.imagem
        const preco = req.body.preco
        const descricao = req.body.descricao
        const product = {nome, imagem, preco, descricao}

        await Product.updateOne({ _id: id }, product)

        res.redirect("/products")
    }

    static async removeProduct(req, res) {
        const id = req.params.id
        await Product.deleteOne({ _id: id })

        res.redirect('/products')
    }

}