const express = require('express');

const router = express.Router();

const authorController = require('../controller/authorcontroller');

const blogsController = require('../controller/blogsController');

const middlewareModel = require('../middleware/auth')






router.post('/authors',authorController.createAuthor)

router.post('/blogs',middlewareModel.authentication,blogsController.createBlog)

router.get('/blogs',middlewareModel.authentication,blogsController.getData)

router.put('/blogs/:blogId',middlewareModel.authentication,middlewareModel.authorise,blogsController.updateData)

router.delete('/blogs/:blogId',middlewareModel.authentication,middlewareModel.authorise,blogsController.deletedBlogs)

router.delete('/blogs',middlewareModel.authentication,middlewareModel.authorise,blogsController.deletedBlogsQuery)

router.post('/login',authorController.login)






module.exports = router;