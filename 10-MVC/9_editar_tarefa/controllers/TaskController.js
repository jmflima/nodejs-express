const Task = require('../models/Task')

module.exports = class TaskController{
    static createTask( req, res ) {
        res.render('tasks/create')
    }

    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        //validações
        //processar dados
        
        await Task.create(task)

        res.redirect('/tasks')
    }

    static async removeTask( req, res ) {
        const id = req.body.id
        await Task.destroy({ where: {id: id} })

        res.redirect('/tasks')
    }

    static async pesquisaTask(req, res) {
        const id = req.params.id
        const retorno = await Task.findOne({raw: true, where: { id: id } })
        if (retorno.done == 1){
            retorno.done = true
        }else{
            retorno.done = false
        }
        console.log(`O done agora ;é ${retorno.done}`)
        res.render('tasks/edite', { retorno })
    }

    static async updateTask(req, res) {
        const id = req.body.id

        const dados = {
            title: req.body.title,
            description: req.body.description
       }
       await Task.update( dados, {where: { id: id } })
   
        res.redirect('/tasks')
    }

    static async showTasks( req, res ) {
        const tasks = await Task.findAll({raw: true})

        res.render('tasks/all', { tasks })
    }

}