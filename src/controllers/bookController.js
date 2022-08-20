const bookModel= require("../models/bookModel")
const authorModel = require("../models/authorModel")
const publisherModel = require("../models/publisherModel")
const { publisher } = require("./publisherController")

// 3rd question with condition :-

const createBook= async function (req, res) {
    let book = req.body
    const authorId = book.author
    const publisherId = book.publisher
    if(!authorId){res.send("Author Id ERROR")
      }else if(!publisherId){res.send("Publisher Id ERROR")}
      else if(!await authorModel.findOne({_id:authorId})){ res.send("author Id is not valid ,put valid input")}
      else if(!await publisherModel.findOne({_id:publisherId})){ res.send("Publisher Id is not valid ,put valid input")}
      else{
         let books1= await bookModel.create(book)
         res.send({msg:books1})
      }
 }

// 4 th question :-

const getBooksData= async function (req, res) {
    let books = await bookModel.find().populate('author').populate('publisher')
    res.send({data: books})
}

//5th question :-
//5(b) question :-

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await authorModel.find({rating:{$gt: 3.5}}).select({_id:1})
    let ami = specificBook.map((x)=>{return x._id.tostring()})
    let finalbooks = await bookModel.updateMany({author_id:ami},{ $inc:{price:+10}})
    res.send({data:finalbooks})
}

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
