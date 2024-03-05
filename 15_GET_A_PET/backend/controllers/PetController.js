const Pet = require("../models/Pet")

//helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {

    //create a Pet
    static async create(req, res) {
        
        const {nome, idade, peso, raca, cor } = req.body

        const images = req.files

        const available = true

        //upload images

        //validations
        if(!nome) {
            res.status(422).json({ message: "O nome é obrigatório" })
            return
        }
        if(!idade) {
            res.status(422).json({ message: "A idade é obrigatória" })
            return
        }
        if(!peso) {
            res.status(422).json({ message: "O peso é obrigatório" })
            return
        }
        if(!raca) {
            res.status(422).json({ message: "A raca é obrigatória" })
            return
        }
        if(!cor) {
            res.status(422).json({ message: "A cor é obrigatória" })
            return
        }

        if(images.langth === 0) {
            res.status(422).json({ message: "A imagem é obrigatória" })
            return
        }

        //pegando token do dono do pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        //criando um pet com os dados do seu dono
        const pet = new Pet({
            nome,
            idade,
            peso,
            raca,
            cor,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            },
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })
            
        try {
            const newPet = await pet.save()
            res.status(201).json({ message: "Pet cadastrado com sucesso", 
            newPet: newPet,
            })
        } catch (error) {
            res.status(500).json({ message: error })
        }


    }

    // resgatando todos os Pets para adoção
    static async getAll(req, res){
        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({
            pets: pets,
        })
    }

    // resgatando todos os Pets para adoção do usuário logado
    static async getAllUserPets(req, res){
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet
        .find({'user._id': user._id})
        .sort('-createdAt')

        res.status(200).json({ pets })
    }

    // resgatando os pets adotados pelo usuário logado
    static async getAllUserAdoptions(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet
        .find({'adopter._id': user._id})
        .sort('-createdAt')

        res.status(200).json({ pets })

    }

    // Consultando o Pet pelo ID
    static async getPetById(req, res) {

        const id = req.params.id

        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: "Id inválido"}) 
            return
        }

        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404).json({ message: "Pet não encontrado"}) 
            return

        }

        res.status(201).json({ pet: pet })
    } 

    static async removePetById(req, res) {

        const id = req.params.id

        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: "Id inválido"}) 
            return
        }
        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404).json({ message: "Pet não encontrado"}) 
            return

        }

        //checar se o foi o usuário logado quem cadastrou o Pet
        //só quem cadastrou pode excluir um Pet
        const token = getToken(req)
        const user =  await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({ message: "Houve um problema com sua informação. Tente mais tarde" })
            return
        }

        await Pet.findByIdAndRemove(id)

        res.status(200).json({ massage: "Pet removido com sucesso" })
    }
}