const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TimerSchema = new Schema ({
    days: {type: Number}, 
    hours: {type: Number}, 
    minutes: {type: Number}, 
    seconds: {type: Number}
})

module.exports = mongoose.model('timer', TimerSchema)