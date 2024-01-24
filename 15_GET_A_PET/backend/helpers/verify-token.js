const jwt =  require('jsonwebtoken')
const getToken = require('./get-token')

//midleware to validate token
const checkToken = (req, res, next) => {
    //não veio o campo de autorização
    if(!req.headers.authorization){
        return res.status(401).json({ message:'Acesso negado' })
    }
    const token = getToken(req)

    //token inválido
    if(!token){
        return res.status(401).json({message:'Acesso negado.'})
    }

    try{
        const verified = jwt.verify(token, 'nossosecret')
        req.user = verified
        next()
    }catch(err){
        return res.status(400).json({message:'Token inválido'})
    }
}
module.exports = checkToken