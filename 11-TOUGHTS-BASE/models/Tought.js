const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

Tought.belongsTo(User) // um pensamento só tem um usuário
User.hasMany(Tought) //um usuário tem vários pensamentos

module.exports = Tought