const {model,Schema} = require('mongoose');

const schema = new Schema({
    token:{type:String,required:true,unique:true}
})

module.exports = model('Session',schema)