const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
const OrderController= require("../controllers/orderdocumentController")
const ProductController=require("../controllers/productController") 
const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createorder",commonMW.mid1,OrderController.createorder)

router.post("/createproduct", ProductController.createproduct)

router.post("/createUser",commonMW.mid1,UserController.createUser)



module.exports = router;