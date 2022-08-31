const express = require('express');
const router = express.Router();
const userController= require("../controllers/Controllercommon")
const middlewareModel = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login",middlewareModel.Authontication,userController.loginUser)

//The userId is sent by front end

router.get("/users/:userId",middlewareModel.Authorijation,userController.getUserData)

router.put("/delete/:userId",middlewareModel.Authorijation,userController.deleteUser)

router.put("/update/:userId",middlewareModel.Authorijation,userController.updateUser)

router.post("/posts/:userId/post",middlewareModel.Authorijation,userController.postUser)

module.exports = router;