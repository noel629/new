const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiarySchema = new Schema({
    title: { type: String },
    description: { type: String },
    date: { type: String },
    time: { type: String },
    lastEdited: { type: String }
})

module.exports = mongoose.model('diary', DiarySchema)