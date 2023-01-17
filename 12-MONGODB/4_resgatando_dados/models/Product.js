const conn = require("../db/conn")

class Product{

    constructor(nome, imagem, preco, descricao){

        this.nome = nome
        this.imagem = imagem
        this.preco = preco
        this.descricao = descricao

    }

    save(){

        const product = conn.db().collection('products'). insertOne({
            nome: this.nome,
            imagem: this.imagem,
            preco: this.preco,
            descricao: this.descricao
        })

        return product
    }

    static getProducts() {
        const products = conn.db().collection('products').find().toArray()

        return products
    }

}

module.exports = Product
