const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel");


///////////////////////////////////////////  UserCreate  ///////////////////////////////////////////////////

const createUser = async function (req, res) {
  let data = req.body;
  try {
    let savedData = await userModel.create(data);
    res.status(200).send({ msg: savedData });
  } catch (err) {
    console.log("this is the error", err.message)
    res.status(500).send({ status: false, msg: "create details is not currect", err: err.message })
  }
};

///////////////////////////////////////////// authonication  ////////////////////////////////////////////////

const loginUser = async function (req, res) {
  try {

    let userName = req.body.emailId;

    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "Plutonium",
        organisation: "FUnctionUp",
      },
      "functionup-BK"
    );
    res.setHeader("x-auth-token", token);
    res.status(201).send({ status: true, data: token });
  } catch (err) {
    res.status(500).send({ status: false, msg: "login is incorrect", err: err.message })
  }
}

//////////////////////////////////////////  authorization  ////////////////////////////////////////////////////////

const getUserData = async function (req, res) {
  try{

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.status(200).send({ status: true, data: userDetails });
  } catch (err) {
    res.status(500).send({ status: false, msg: "login is incorrect", err: err.message })
  }
}


//////////////////////////////////////////////  deletion  ///////////////////////////////////////////////////////

const deleteUser = async function (req, res) {
  try {

    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(403).send("No such user exists");
    }

    user.isdeleted = true;
    console.log(user)

    let userdelete = await userModel.findOneAndUpdate({ _id: userId }, user, { new: true });
    res.status(200).send({ status: "delete succesfully", data: userdelete });
  } catch (error) {
    res.status(500).send({ status: false, msg: "login is incorrect", error: error.message })
  }
}


////////////////////////////////////////////// Updateuser //////////////////////////////////////////////////


const updateUser = async function (req, res) {
 try{
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
   return res.status(400).send("No such user exists");
   }

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    res.status(200).send({ status: "Updated" , data: updatedUser });
   }catch (error) {
    res.status(500).send({ status: false, error: error.message })
  }
}


//////////////////////////////////////// PostUser  ///////////////////////////////////////////////

const postUser = async function(req,res){
  try{
    let userId1 = req.params.userId 
    let post = req.body.post
    const user = await userModel.findById(userId1)
    user.post =[]
    let updatePost = user.post
    updatePost.push(post)
    const postMassage =await userModel.findOneAndUpdate({_id:userId1},{post:updatePost},{new:true});
    res.status(200).send({status :true,date:postMassage})
  } catch (error) {
    res.status(500).send({ status: false, error: error.message })
  }
}



module.exports.createUser = createUser
module.exports.loginUser = loginUser
module.exports.getUserData = getUserData
module.exports.deleteUser = deleteUser
module.exports.updateUser = updateUser
module.exports.postUser = postUser