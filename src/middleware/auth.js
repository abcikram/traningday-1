const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')


const Authontication = async function (req, res, next){

  try{

       let userName = req.body.emailId;

       let password = req.body.password;

       let user = await userModel.findOne({ emailId: userName, password: password });

       if (!user)
       return res.status(404).send({status: false,msg: "username or the password is not corerct"})
      
       next()

    }catch(error){
      res.status(500).send({status: "Error",error:error.message})
    }
  }


const Authorijation = async function (req, res, next) {
  try {
    let token = req.headers["x-auth-token"];
    if (!token)
      token = req.headers["x-auth-token"];

    if (!token)
      return res.status(403).send({ status: false, msg: "token must be present" });
    console.log(token);

    let decodedToken = jwt.verify(token, "functionup-BK");

    if (!decodedToken) {
      return res.status(403).send({ status: false, msg: "token is invalid" });
    }
    next();

  } catch (error) {
    console.log("This is error", error.message)
    res.status(500).send({ msg: "ERROR", error: error.message })
  }

};




module.exports.Authorijation = Authorijation

module.exports.Authontication = Authontication
