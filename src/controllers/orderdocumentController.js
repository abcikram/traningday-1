const { count } = require("console")
const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

const createorder= async function (req, res) {
    let order = req.body
    let userId = order.userId
    let productId = order.productId
       if(!userId){res.send("user Id ERROR")
         }else if(!productId){res.send("Product Id ERROR")}
         else if(!await userModel.findOne({_id:userId})){ res.send("user Id is not valid ,put valid input")}
         else if(!await productModel.findOne({_id:productId})){ res.send("Product Id is not valid ,put valid input")}
         
         let productprice = productId.price
         let userbalence = userId.balence 
         let netbalence = userbalence - productprice
        
         let token = req.headers.isFreeAppUser
         console.log(token)
          if(token === 'true'){
          order['amount'] = 0;
          order.isFreeAppUser = token
          let neworder = await orderModel.create(order) 
          res.send({data:neworder})
        }else if(userbalence>=productprice){
               let chinku = await userModel.findOneAndUpdate({_id:userId},{$set:{balence:netbalence}},{new:true})
               order['amount']=productId.price
               order['isFreeAppUser']= req.headers.isfreeappuser
               let savedata = orderModel.create(order)
               res.send({msg:savedata})
        }else{
              res.send("Not enough Balence")
             }
        }

     
       
        
     


 
module.exports.createorder = createorder
 



