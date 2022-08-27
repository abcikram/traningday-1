const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const authorSchema = new mongoose.Schema( {
        
        userId:{ 
            type:ObjectId,
            ref:"Userlevel"
        },
        productId:{
                type:ObjectId,
                ref:"productlevel"
            
        },
        amount: Number,
        isFreeAppUser: Boolean, 
        date: String ,
    }

, { timestamps: true });

module.exports = mongoose.model('orderlevels', authorSchema)
