const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
     bookName: {
        type : String,
        require : true,
        }, 
    authorName : String, 
    tags: [String],
    year: Number,
    totalPage: Number,
    stockAvailable: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    }
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema)

