const multer = require("multer")
const path = require("path")

//destination to store the images

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = ""

        if(req.baseUrl.includes("users")) {
            folder = "users"
        }else if(req.baseUrl.includes("pets")) {
            folder = "pets"
        }
        cb(null, `public/images/${folder}`)
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
        //resultado 293489238942232389.jpg
    },
})

//para obrigar o uso de apenas jpg ou png
const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|png)$/)) {
            return cb(new Error("Só pode usar as extenções jpg ou png"))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }