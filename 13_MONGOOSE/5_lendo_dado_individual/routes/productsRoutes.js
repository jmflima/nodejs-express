const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductController')

// router.get('/edit/:id', ProductController.editProduct)
// router.post('/edit', ProductController.editProductPost)

//acessa o formulário de inclusão
router.get('/create', ProductController.createProduct)
//grava as informações digitadas
router.post('/create', ProductController.createProductPost)

//pesquisa e exclui
// router.post('/remove/:id', ProductController.removeProduct)

//pesquisa um produto
router.get('/:id', ProductController.getProduct)

 //acessa a home
 router.get('/', ProductController.showProducts)

module.exports = router