const authormodel = require('../model/authormodel');
const blogsModel = require('../model/blogsmodel');

const createBlogs = async function (req, res) {
    let blogs = req.body
    let condition = await authormodel.findById(blogs.authorId)
    if(condition){
        if(blogs.isPublished == true){
            blogs.publishedAt = Date.now()
            let savedData = await blogsModel.create(blogs)
            res.status(201).send({ data: savedData })
        }
        else if(blogs.isPublished == false){
            let savedData = await blogsModel.create(blogs)
            res.status(201).send({ data: savedData })
        }
    }else{
        res.status(400).send({status:false, msg:"authorId is not present"})
    }
}

module.exports.createBlogs = createBlogs