const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name: String,
    balence: Number,
    gender : {
        type: String,
        enum: ["male", "female", "other"] 
    },
    address: String,
    age: Number,
    isFreeAppUser:{
        type:Boolean,
        default:false
    },
}, { timestamps: true });

module.exports = mongoose.model('Userlevel', userSchema) 





