const {model,Schema} = require('mongoose');

const schema = new Schema({
    login:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String, required:true, unique:true},
})

module.exports = model('User',schema)