const Product = require('../models/Product')

module.exports = class ProductController {
    // static async showProducts(req, res){
    //     const products = await Product.getProducts()

    //     res.render('products/all', { products })
    // }

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
        
        //executa a função save() no model
        await product.save()

        res.redirect('/products')
    }

//     static async getProduct(req, res) {
//         const id = req.params.id

// //      executa a função de dados getProductById no model
//         const product = await Product.getProductById(id)
//         res.render('products/product', { product })
//     }

//     static async removeProduct(req, res) {
//         const id = req.params.id
//         await Product.removeProductById(id)

//         res.redirect('/products')
//     }

//     static async editProduct(req, res) {
//         const id = req.params.id

// //      executa a função de dados getProductById no model
//         const product = await Product.getProductById(id)
//         res.render('products/edit', { product })
//     }

//     static async editProductPost(req, res){
//         const id = req.body.id
//         const nome = req.body.nome
//         const imagem = req.body.imagem
//         const preco = req.body.preco
//         const descricao = req.body.descricao

//         const product = new Product(nome, imagem, preco, descricao)

//         await product.updateProduct(id)

//         res.redirect("/products")
//     }


}