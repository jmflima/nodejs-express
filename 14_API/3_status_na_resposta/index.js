const express = require('express')
const app = express()

// read body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// rotas - endpoints

app.post('/createproduct', (req, res) => {

    const nome = req.body.nome
    const preco = req.body.preco

    if(!nome){
        res.status(422).json({ message: " O campo nome é obrigatório" })
        return
    }

    console.log(nome)
    console.log(preco)

    res.status(201).json({message: `Produto ${nome} cadastrado com sucesso`})
})

app.get('/', (req, res) => {
    res.status(200).json({message: 'Primeira rota criada com sucesso'})
})

app.listen(3000)
