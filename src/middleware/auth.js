const authotModel = require("../model/authormodel");
const jwt = require('jsonwebtoken');
const blogsModel = require('../model/blogsmodel');
const { relativeTimeRounding } = require("moment");


//================================================================================================================//


const authentication = async function (req,res,next){
   try{
        let token = req.headers["x-auth-token"];

        if(!token)
        return res.status(403).send({ status: false , msg:"token must be present"});
        console.log(token);

        let decodedtoken = jwt.verify(token,"project-1")
        if(!decodedtoken){
            return res.status(400).send({status:false, msg:"token is invalid"})
        }

        next();

     }catch(error){
        res.status(500).send({msg:"ERROR",error:error.message})
     } 
}

//==============================================================================================================//


const authorise = async function(req,res,next){
    
    // compare the logged in user's id and the id in request
    
    let user = req.params.blogId
    let token = req.headers["x-auth-token"];
    if(!user) return res.status(400).send({msg:"Invalid user Id"})
    if(!token)
    return res.status(403).send({ status: false , msg:"token must be present"});

    let decodedtoken = jwt.verify(token,"project-1")
    if(!decodedtoken){
        return res.status(403).send({status:false, msg:"token is invalid"})
    }
    let decodedId = decodedtoken.UserId
      let data = await blogsModel.findOne({_id:user})
    
      let autherId2 = data.authorId.toString()
      
      if(decodedId != autherId2){
       return res.status(400).send({status:false,msg:"User is not authorise to change"})
       }
    next()
  }


  
//================================================================================================================//


  
module.exports.authentication = authentication

module.exports.authorise = authorise
