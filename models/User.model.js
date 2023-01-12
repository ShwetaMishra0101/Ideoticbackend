const mongoose = require('mongoose')

const userDetailsSchema = new mongoose.Schema({
    fName:String,
    lName:String,
    email:{type:String,unique:true},
    password:String,
})

const user = mongoose.model("userInfo", userDetailsSchema);

module.exports = user;