const userModel = require("../models/userModel")
const productModel = require("../models/productModel")
const orderModel = require("../models/orderModel")

const mid1 = function ( req, res, next) {
    if(req.headers.isFreeAppUser===undefined){
       console.log("ERROR")
       res.send("PUT VALID VALUE,VALIDATION FAIL")
    }
      next()
}




module.exports.mid1= mid1
