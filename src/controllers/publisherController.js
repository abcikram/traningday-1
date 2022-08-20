const publisherModel= require("../models/publisherModel")


const publisher= async function (req, res) {
    let public = req.body
    let publishCreated = await publisherModel.create(public)
    res.send({msg: publishCreated})
}

module.exports.publisher = publisher