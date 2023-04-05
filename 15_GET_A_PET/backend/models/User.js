const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
    'User',
    new Schema(
        {
            id:
            {
                type:Schema.Types.ObjectId, 
                ref:'User'
            },            
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            image: {
                type: String,
            },
            phone: {
                type: String,
                required: true
            }
        },
        {timestamps: true },
    )
)

module.exports = User