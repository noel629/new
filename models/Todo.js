const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    date: { type: String },
    title: { type: String },
    description: { type: String },
    isComplete: { type: Boolean, default: false }
})

module.exports = mongoose.model('todo', TodoSchema)