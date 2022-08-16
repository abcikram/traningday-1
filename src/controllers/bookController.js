const { count } = require("console")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let vata= req.body

    let savevata= await BookModel.create(vata)
    res.send({msg: savevata})
}

//bookList : gives all the books- their bookName and authorName only 
const booklist = async function (req,res) {
    let allBooks = await BookModel.find().select( { bookName: 1, authorName: 1, _id: 0}) 
    return res.send({msg: allBooks})
}

//getBooksInYear: takes year as input in post request and gives list of all books published that year 
const getBooksInYear = async function (req,res) {
     let allBooksyear= await BookModel.find({"year": 1960})
     return res.send({msg : allBooksyear })
}


const getParticularBooks = async function (req,res) {
    let allParticularBooks = await BookModel.find( {authorName : "rihana", year : 2016 ,tags :"adv"}).select({_id: 0})
     
    return res.send({msg : allParticularBooks})
}


//getRandomBooks - returns books that are available in stock or have more than 500 pages:- 
const getRandomBooks = async function (req,res) {
    let allRandonBooks = await BookModel.find( {$or :[{stockAvailable: true},{totalPage:{$gt : 500}}]}).select({_id: 0})
     
    return res.send({msg : allRandonBooks})
}

module.exports.createBook = createBook 

module.exports.booklist = booklist

module.exports.getBooksInYear = getBooksInYear

module.exports.getParticularBooks = getParticularBooks 

module.exports.getRandomBooks = getRandomBooks 