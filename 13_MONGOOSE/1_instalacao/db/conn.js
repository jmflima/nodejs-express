const mongoose = require('mongoose')

async function main(){
    mongoose.set("strictQuery", true);
    await mongoose.connect('mongodb://localhost:27017/testemongoose')
    console.log('conectou ao mongodb com o mongoose')
}

main().catch((err) => console.log(err))

module.exports = mongoose