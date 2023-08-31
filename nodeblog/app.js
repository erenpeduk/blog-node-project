const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const app = express() 
const port = 3000
const hostname = "127.0.0.1" 
const fileUpload = require('express-fileupload')
const moment = require('moment')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const methodOverride = require("method-override")
const Handlebars = require('handlebars')
const limit = require('./helpers/limit').limit
const truncate = require('./helpers/truncate').truncate
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


mongoose.connect('mongodb://127.0.0.1/nodeblog_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret: 'testotesto',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({mongooseConnection: mongoose.connection})
    
    
}))

// Flash - Message Middleware
app.use((req,res,next)=>{
    res.locals.sessionFlash = req.session.sessionFlash
    delete req.session.sessionFlash
    next()
})




app.use(fileUpload())

app.use(express.static('public'))

app.use(methodOverride('_method'))

const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        limit: limit,
        truncate:truncate,
        generateDate : (date, format) => {
            return moment(date).format(format)
        },
       
    }
})

app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



// DISPLAY LINK Middleware
app.use((req, res, next) => {
    const { userId } = req.session
    if (userId) {
        res.locals = {
            displayLink: true
        }
    } else {
        res.locals = {
            displayLink: false
        }
    }
    next()
})



const main = require('./routes/main')
app.use('/', main)

const posts = require('./routes/posts')
app.use('/posts', posts)

const users = require('./routes/users')
app.use('/users', users)

const admin = require('./routes/admin/index')
app.use('/admin', admin)

const contact = require('./routes/contact')
app.use('/contact', contact)


app.listen(port,hostname, ()=>{
    console.log(`Server is running at http://${hostname}:${port}/`)
})