const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    gender: String,
    age: String,
    date: String,
    status: String
})

const User = mongoose.model('User', userSchema)

module.exports = User