const app = require('express')()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const async = require('async')


//.env variables
require('dotenv').config()

//Schema
const User = require('./models/Users')

const url = process.env.URI
mongoose.connect(url, ({ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify:false }));
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
console.log("connection succeeded");

//EJS
app.use(cors())
app.set('view engine', 'ejs');

//body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Home 
app.get('/', (req, res) => {
    res.render('index')
})

//Fetch Api
app.get('/fetchAPI', (req, res) => {
    res.render('fetchAPI')
})

//Build Rest API
app.get('/buildAPI', (req, res) => {
    res.render('buildAPI')
})

//Build API Handle
app.post('/buildAPI', async (req, res) => {
    const { name, gender, age, date, status } = req.body
    const newUser = new User({
        name,
        gender, 
        age,
        date,
        status
    })

    try {
        await newUser.save()
        res.redirect('/buildAPI')
    } catch(err) {
        console.log(err);
    }
})

//
app.get('/posts', async (req, res) => {
    
    try {
        const users = await User.find()
        res.send(users)
    } catch(err) {
        console.log(err);
    }
})

app.listen(3000)