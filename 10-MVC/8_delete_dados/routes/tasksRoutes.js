const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/TaskController')

router.get('/add', TaskController.createTask) //a view para digitação
router.post('/add', TaskController.createTaskSave) //salvar os dados
router.post('/remove', TaskController.removeTask) //deleta os dados
router.get('/', TaskController.showTasks)

module.exports = router