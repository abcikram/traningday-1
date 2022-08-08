const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();



router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
   // logger.welcome()

    res.send('My second ever api!')
});



////////////////////////////////////////// 1st question ////////////////////////////////////////

router.get('/get-movies', function (req, res){
    let moviesname = ['Sholay', 'DDLJ', '3idiots', 'endgame'] ;
    res.send(moviesname)
})


////////////////////////////////////////// 2nd question ////////////////////////////////////////

router.get('/get-movies/:indexnumber',function (req, res){

 let movies1=['SHOLAY','DANGAL','DON 2','GOOD NEWS']
    let index = (req.params.indexnumber)
    console.log(movies1[index])
    res.send(movies1[index])

})

////////////////////////////////////////// 3rd question ////////////////////////////////////////

router.get('/get-movies/:indexnumber',function (req, res){

    let movies1=['SHOLAY','DANGAL','DON 2','GOOD NEWS']
    let index = (req.params.indexnumber) 
    if (index > movies1.length){
        console.log("put valid index") ;
        return res.send("put valid index");
    }
    else{
        res.send(movies1[index]);
    }
})

////////////////////////////////////////// 4th question ////////////////////////////////////////

router.get('/get-films',function (req, res){

   let movies2 = [ {'id': 1 ,'name':"The Shining"} , 
                   {'id': 2 ,'name':"Incendies"} ,
                   {'id': 3 ,'name':"Rang De Basanti"} ,
                   {'id': 4 ,'name':"Finding Nemo"} ];

   res.send(movies2)
   })


////////////////////////////////////////// 5th question ////////////////////////////////////////

router.get('/get-films/:indexnumber',function (req, res){

    let movies2 = [ {'id': 1 ,'name':"The Shining"} , 
                    {'id': 2 ,'name':"Incendies"} ,
                    {'id': 3 ,'name':"Rang De Basanti"} ,
                    {'id': 4 ,'name':"Finding Nemo"} ];
                    
    let index = (req.params.indexnumber) 
    if (index > movies2.length){
        console.log("put valid index") ;
        return res.send("put valid index");
    }
    else{
        res.send(movies2[index]);
    }
    })

/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/student-details/:name', function(req, res){
    /*
    params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object where key is the variable defined in code 
    and value is what is sent in the request
    */

    let requestParams = req.params

    // JSON strigify function helps to print an entire object
    // We can use any ways to print an object in Javascript, JSON stringify is one of them
    console.log("This is the request "+ JSON.stringify(requestParams))
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    
    res.send('Dummy response')
})

module.exports = router;