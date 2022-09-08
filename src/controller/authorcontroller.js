const authorModel = require('../model/authormodel');
const jwt = require("jsonwebtoken")




const createAuthor = async function (req, res) {
    try{
    let author = req.body
    let authorCreated = await authorModel.create(author)
    res.status(201).send({ data: authorCreated })
   }catch(error){
    console.log("This is thr error:", error.message)
    res.status(500).send({ msg: "error", error: error.message })
 }
}


//================================================================================================================//

//POST /login
//Allow an author to login with their email and password. On a successful login attempt return a JWT token contatining the authorId in response body like this
//If the credentials are incorrect return a suitable error message with a valid HTTP status code

//===============================================================================================================//

const login = async function (req,res) {

    try{

        let authoremail = req.body.email
        let authorpassword = req.body.password

        let author = await authorModel.findOne({email:authoremail,password:authorpassword})
        if(!author){
            return res.status(400).send({status:false,msg:"author email and password is not valid"})
        }

        let token = jwt.sign(
            {
                 UserId:author._id.toString(), //The author which I created in go to this id and convert to number to string
                 batch:"plutonium"
            },
            "project-1"
        );

        res.setHeader("x-auth-token",token);
        res.status(400).send({status:true,data:token})
       }catch(error){
        res.status(500).send({status:false, msg:"login incorrect",error:error.message})
    }
        
 }



module.exports.createAuthor = createAuthor

module.exports.login = login