const { count } = require("console")
const productModel= require("../models/productModel")

const createproduct= async function (req, res) {
    let data = req.body
    let savedproduct= await productModel.create(data)
    res.send({data:savedproduct})
}

module.exports.createproduct = createproduct
