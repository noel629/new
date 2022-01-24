const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    confirmPassword: { type: String },
    isAdmin: {type: Boolean, default: false}
})

module.exports = mongoose.model('user', UserSchema)