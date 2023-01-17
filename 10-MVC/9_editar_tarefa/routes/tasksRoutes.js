const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/TaskController')

router.get('/add', TaskController.createTask) //a view para digitação
router.post('/add', TaskController.createTaskSave) //salvar os dados
router.post('/remove', TaskController.removeTask) //deleta os dados
router.get('/pesquisa/:id', TaskController.pesquisaTask) //pesquisa um dado
router.post('/update', TaskController.updateTask) //pesquisa um dado
router.get('/', TaskController.showTasks)

module.exports = router