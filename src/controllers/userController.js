const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    let data1= req.body
    let lathi = req.headers.isfreeappuser
    data1.isFreeAppUser =lathi
    let saveduser= await UserModel.create(data1)
    res.send({data:saveduser})
}


    
module.exports.createUser= createUser

