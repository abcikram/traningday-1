const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name:String,
    author:{
        type:ObjectId,
        ref:"tinkuAuthor"
    },
    price:Number,
    ratings: Number,
    publisher: {
        type: ObjectId,
        ref:"tinkuPublisher"
    }
  }, { timestamps: true });


module.exports = mongoose.model('tinkubook', bookSchema)


