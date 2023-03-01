const jwt = require('jsonwebtoken')

const creatUserToken = async(user, req, res) => {

    //create a token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "nossosecret")

    //return a token
    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: user._id
    })
}

module.exports = creatUserToken