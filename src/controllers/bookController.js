const { count } = require("console")
const { response } = require("express")
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


const getBooksInYear = async function (req,res) {
    let newyear = req.body.year 
    let allBooksyear= await BookModel.find({year:newyear})
    if(allBooksyear.length==0)return res.send("data not found")
    return res.send({msg : allBooksyear })
   }


const getParticularBooks = async function (req,res) {
        let body = req.body 
        let input = body.bookName;
        let booksinput= await BookModel.findOneAndUpdate({bookName =input},{$set:{authorName:body.authorName,year:body.year}},{new:true});
        if(!booksinput) return res.send("data not found")
        res.send({msg : booksinput});
    }


const getRandomBooks = async function (req,res) {
    let allRandonBooks = await BookModel.find( {$or :[{stockAvailable: true},{totalPage:{$gt : 500}}]}).select({_id: 0})
     
    return res.send({msg : allRandonBooks})
}


const  getXINRBooks = async function (req,res) {
    let allXINRBook = await BookModel.find({"price.indianPrice":{ $in: [ "100INR", "200INR", "500INR"]}})
    res.send({msg: allXINRBook})

}


module.exports.createBook = createBook 

module.exports.booklist = booklist

module.exports.getBooksInYear = getBooksInYear

module.exports.getParticularBooks = getParticularBooks 

module.exports.getRandomBooks = getRandomBooks   

module.exports.getXINRBooks = getXINRBooks

// async function hello (){
//     console.log("2")
//     return "hello"
// }

// console.log(hello())