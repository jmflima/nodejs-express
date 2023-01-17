const conn = require("../db/conn")

class Product{

    constructor(nome, preco, descricao){

        this.nome = nome
        this.preco = preco
        this.descricao = descricao

    }

    save(){

        const product = conn.db().collection('products'). insertOne({
            nome: this.nome,
            preco: this.preco,
            descricao: this.descricao
        })

        return product
    }

}

module.exports = Product
