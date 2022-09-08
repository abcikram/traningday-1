const authormodel = require('../model/authormodel');
const blogsModel = require('../model/blogsmodel');
const moment = require('moment')



//=================================================================================================================//



const createBlog = async (req, res) => {
  try {
    let blogData = req.body;
    let { title, body, authorId, tags, category, subcategory, isPublished } =
      blogData;
    let validAuthorId = await authormodel.findById(authorId);
    if (!validAuthorId) {
      return res.staus(400).send({ status: false, msg: "userId is not valid" });
    }
    let blogDatas = {
      title: title,
      body: body,
      authorId: authorId,
      tags: tags,
      category: category,
      subcategory: subcategory,
      isPublished: isPublished ? isPublished : false,
      publishedAt: isPublished ? new Date() : null,
    };
    //Blogs creation
    let savedData = await blogsModel.create(blogDatas);
    return res.status(201).send({ status: true, data: savedData });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
}



//=================================================================================================================//




const getData = async (req, res) => {

  let Data = req.query

  let blogData = await blogsModel.find({ $and: [{ isDeleted: false }, { isPublished: true }, Data] }).populate("authorId")
  //we are using query for same same authorId 
  // bengali :- akane amra $and ar moddhey 3 ta condition nicci , isDeleted ,isPublished  and Data , Data ke 
  // arjonno nicchi jehetu Data is a query params arjonno qurey param ar data guo condition a cheack hobe.

  if (!blogData) {
    res.status(400).send({ msg: "Blogdata is not valid" })
  }
  res.status(201).send({ status: true, data: blogData })
}



//==================================================================================================================//



const updateData = async function (req, res) {
  let getId = req.params.blogId
  let data = req.body
  let checkId = await blogsModel.findOne({ _id: getId })
  if (checkId) {
    if (checkId.isDeleted === false) {
      let checkData = await blogsModel.findByIdAndUpdate(getId, {
        $push: { tags: data.tags, subcategory: data.subcategory },
        title: data.title, body: data.body, isPublished: data.isPublished,publishedAt:Date.now()
      },{new:true})
      res.status(200).send({ status: true, data: checkData })
    } else {
      res.status(404).send("File is not present or Deleted")
    }
  } else {
    res.status(404).send({ status: false, msg: "please enter valid blog id" })
  }
}


//==================================================================================================================//



const deletedBlogs = async (req, res) => {
   let deleteId = req.params.blogId
   let checkId1 = await blogsModel.findOne({ _id: deleteId })
   if (checkId1) {
        if((checkId1.isDeleted === false) && (checkId1.isPublished === true)){
        let daletedData = await blogsModel.findOneAndUpdate(deleteId, { $set: { isDeleted: true } })
         res.status(200).send({ status: true, data: daletedData })
      }else{
        res.status(400).send({msg:" The document is already deleted"})
     }
   } else {
    res.status(404).send({ status: false, msg: "Blog document doesn't exist" })
  }
}


//==================================================================================================================//



const deletedBlogsQuery = async (req, res) => {
  let deleteData = req.query
  let checkId2 = await blogsModel.findOne(deleteData)
  console.log(checkId2)
  if (!checkId2) {
    res.status(404).send({ msg: "Invalid Query" })
   }
   else{

    if(checkId2.isDeleted === false){
      let daletedData = await blogsModel.findOneAndUpdate(deleteData,{$set:{isDeleted: true}},{new:true})
      return res.status(200).send({ status: true, data: daletedData })
      }else{
     return res.status(400).send({msg:"The file is already deleted"})
   }
  }
}



//================================================================================================================//


module.exports.createBlog = createBlog

module.exports.getData = getData

module.exports.updateData = updateData

module.exports.deletedBlogs = deletedBlogs

module.exports.deletedBlogsQuery = deletedBlogsQuery