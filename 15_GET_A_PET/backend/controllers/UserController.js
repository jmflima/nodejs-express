const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require("../helpers/get-token")
//const { sanitizeFilter } = require('mongoose')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {

    static async register(req, res){
//        res.json('Olá GET A PET')

        const {name, email, phone, password, confirmpassword} = req.body

        // validates
        if(!name){
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        if(!email){
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }
        if(!phone){
            res.status(422).json({ message: 'O telefone é obrigatório' })
            return
        }
        if(!name){
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        if(!password){
            res.status(422).json({ message: 'A senha é obrigatório' })
            return
        }
        if(!confirmpassword){
            res.status(422).json({ message: 'A confirmação de senha é obrigatório' })
            return
        }
        if(password !== confirmpassword){
            res
                .status(422)
                .json({ message: 'A Senha e confirmação de senha não são iguais' })
            return
        }

        //check if user exist
        const emailExist = await User.findOne({email: email})
        if(emailExist){
            res
                .status(422)
                .json({ message: 'O e-mail informado ja foi cadastrado' })
            return
        }

        //create password

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })
        try{
            const newUser = await user.save() 
//            res.status(201)
//            .json({ message: 'Usuário criado com sucesso!', newUser })

            await createUserToken(newUser, req, res)
        }catch(err){
            res.status(500).json({ message: err})
        }
          
    }

    static async login(req, res) {

        const {email, password} = req.body

        if(!email){
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }    
        if(!password){
            res.status(422).json({ message: 'A senha é obrigatório' })
            return
        }

        //check if user exist
        const user = await User.findOne({email: email})
        if(!user){
            res.status(422).json({ 
                message: 'Não existe usuário com este e-mail!' 
            })
            return
        }

        //check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({ 
                message: 'Senha inválida' 
            })
            return
        }
        //autenticando user
        await createUserToken(user, req, res)
    }

    //obtendo o usuario logado pelo token
    static async checkUser(req, res) {

        let currentUser //variavel indefinida
//        console.log(req.headers.authorization)
        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)

            //zerando a senha
            currentUser.password = undefined

        }else{
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    //Consulta pelo id
    static async getUserById(req, res){

        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if(!user){
            res.status(422).json({ 
                message: 'Usuário não encontrado' 
            })
            return 
        }
        res.status(200).json({ user })

    }
    //Atualização do usuário
    static async editUser(req, res){

        const id = req.params.id

        // check user exist for token
        const token = getToken(req)
        const user = await getUserByToken(token)

//        try{
//            const id = mongoose.Types.ObjectId(req.params.id)
//            const user = await User.findById((id)).select('-password')
//            res.status(200).json({user})

//        }catch(err){
//            res.status(422).json({ message: "Usuário não encontrado"})
//        }

        //validations

        const {name, email, phone, password, confirmpassword} = req.body

        if(req.file) {
            user.image = req.file.filename
        }

        if(!name){
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        user.name = name

        if(!email){
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }

        const userExists = await User.findOne({email: email})
        if(user.email !== email && userExists){
            res.status(422).json({ 
                message: 'Por favor utilize outro email' 
            })
            return
        }
        user.email = email

        if(!phone){
            res.status(422).json({ message: 'O telefone é obrigatório' })
            return
        }
        user.phone = phone

        if(password !== confirmpassword){
            res
                .status(422)
                .json({ message: 'Senhas diferentes' })
            return
        }else if(password === confirmpassword && password != null){
            // creating password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            
            user.password = passwordHash
        }
        try {
            // returnn user update data
            await User.findOneAndUpdate(
                { _id: user._id },
                { $set:user },
                { new: true },                
            )
            res.status(200).json({ 
                message: "Usuário atualizado com sucesso" 
            }) 
        } catch (err) {
            res.status(500).json({ message: "Usar apenas as extensões jpg ou png" })
            return
        }

    }
}