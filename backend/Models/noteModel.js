const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    user:Schema.Types.ObjectId
})

const noteModel=mongoose.model('note',noteSchema)
module.exports=noteModel