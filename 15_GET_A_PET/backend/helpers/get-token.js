const getToken = (req) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
//    console.log(`Esse é o token: ${token}`)

    return token
}

module.exports = getToken