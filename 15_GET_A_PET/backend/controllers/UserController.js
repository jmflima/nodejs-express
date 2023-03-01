const User = require('../models/User')
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-user-token')

module.exports = class UserController {

    static async register(req, res){
//        res.json('Olá GET A PET')

        const{name, email, phone, password, confirmpassword} = req.body

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
            res.status(500).jason({ message: err})
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
                message: 'E-mail não cadastrado' 
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

        await createUserToken(user, req, res)
    }
}