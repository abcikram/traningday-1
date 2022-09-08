const mongoose = require('mongoose');
const validator = require('validator')

const authorSchema = new mongoose.Schema({
    fname: {
        type: String,  
        required:true,    
        unique:true,  
        pattern: "^[A-Z][a-z]+$",
        trim:true
    },
    lname: {
        type: String,    
        required:true,
        uppercase:true,
        pattern: "^[A-Z]{1}[a-z]+[ ]{1}[A-Z]{1}[a-z]+$",
        trim:true   
    },
    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    email: {
        type: String,
        required:true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength:[8, "please put minimum 8 letters"],
    },
}, {timestamps: true})

module.exports = mongoose.model('author', authorSchema)  