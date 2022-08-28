const { count } = require("console")
const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

const createorder= async function (req, res) {
    let order = req.body
    let userId1 = order.userId
    let productId1 = order.productId
       if(!userId1){res.send("user Id ERROR")
         }else if(!productId1){ return res.send("Product Id ERROR")}
         else if(!await userModel.findOne({_id:userId1})){ return res.send("user Id is not valid ,put valid input")}
         else if(!await productModel.findOne({_id:productId1})){ return res.send("Product Id is not valid ,put valid input")}
          
     //     let abc = await orderModel.create(order)
     //     res.send({data:abc})

     //     let productprice = productId1.price
     //     let userbalence = userId1.balence 
     //     let netbalence = userbalence - productprice
        
         let token = req.headers.isfreeappuser;
         console.log(token)
          if(token === 'true'){
          order['amount'] = 0;
          order.isFreeAppUser = token
          let neworder = await orderModel.create(order) 
          res.send({data:neworder})
        }
        
        if(userId1.balence>= productId1.price){
               let abcd = await userModel.findOneAndUpdate({_id:userId1},{$set:{balence : (userId1['balence']-productId1['price'])}})
               order['amount']=productId1['price']
               order['isFreeAppUser']= req.headers.isfreeappuser
               let savedata = orderModel.create(order)
               res.send({msg:savedata})
        }else{
              res.send("Not enough Balence")
             }
        }

     
       
     module.exports.createorder = createorder
 



