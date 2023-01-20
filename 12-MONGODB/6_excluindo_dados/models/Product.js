const conn = require("../db/conn")

const { ObjectId } = require('mongodb')

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
        const products = conn
        .db()
        .collection('products')
        .find()
        .toArray()

        return products
    }

    static async getProductById(id) {
        const product = await conn
          .db()
          .collection('products')
          .findOne({ _id: ObjectId(id) })
    
        return product
    }

    static async removeProductById(id){
        await conn
        .db()
        .collection('products')
        .deleteOne({ _id: ObjectId(id)})

        return
    }
}

module.exports = Product
