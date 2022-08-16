const { count } = require("console")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let vata= req.body

    let savevata= await BookModel.create(vata)
    res.send({msg: savevata})
}

const booklist = async function (req,res) {
    let allBooks = await BookModel.find().select( { bookName: 1, authorName: 1, _id: 0}) 
    return res.send({msg: allBooks})
}

module.exports.createBook= createBook 

module.exports.booklist = booklist