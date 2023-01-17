const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash') //responsáveis pelas flash messages

const app = express()

const conn = require('./db/conn')

// models
const Tought = require('./models/Tought')
const User = require('./models/User')

//importando as Rotas
const toughtsRoutes = require('./routes/toughtsRoutes')

//importando o controller
const ToughtController = require('./controllers/ToughtController')

app.engine('handlebars', exphbs.engine())
app.set('view engine', "handlebars")

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

// session midleware (diz onde salvar as sessões)
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

app.use(express.static('public'))

// set session respostas
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

app.use('/toughts', toughtsRoutes)
app.use('/', ToughtController.showToughts)

conn
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch( (erro) => console.log(erro))