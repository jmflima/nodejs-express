const mongoose = require('../db/conn')
const { Schema } = mongoose

const Pet = mongoose.model(
    'Pet',
    new Schema(
        {
            nome: {
                type: String,
                required: true,
            },
            idade: {
                type: Number,
                required: true,
            },
            peso: {
                type: Number,
                required: true,
            },
            raca: {
                type: String,
                required: true,
            },
            color: {
                type: String,
                required: true,
            },
            image: {
                type: Array,
                required: true,
            },
            available: {
                type: Boolean,
            },
            user: object,
            adopter: object,
        },
        {timestamps: true },
    )
)

module.exports = Pet