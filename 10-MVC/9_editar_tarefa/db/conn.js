const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Conexão estabelecida com sucesso...')
}catch(err) {
    console.log(`Não foi possível conectar o banco mysql ${err}`)
}
module.exports = sequelize

