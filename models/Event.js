const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema ({
    title: { type: String },
    startDate: { type: String },
    endDate: { type: String }
})

module.exports = mongoose.model('event', EventSchema)