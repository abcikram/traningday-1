const express = require('express');
const router = express.Router();
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



router.post("/createBook", BookController.createBook  )

router.get("/booklist", BookController.booklist )

router.get("/getBooksInyear", BookController.getBooksInYear )

router.get("/getParticularBooks", BookController.getParticularBooks)

router.get("/getRandomBooks", BookController.getRandomBooks)

module.exports = router;