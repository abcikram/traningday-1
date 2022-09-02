let axios = require("axios");
const { $where } = require("../models/bookModel");


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)  
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}




let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        console.log("Hello")
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

////////////////////////////////////////// assignment 1 ////////////////////////////////////////////////////////////

let getdistrictByID = async function (req, res) {
    try {
        let district = req.query.districtId
        let date = req.query.date
        console.log(`query params are: ${district} ${date}`) ;
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


/////////////////////////////////////////// assignment 3 //////////////////////////////////////////////////////////

 let memeHandeler = async function (req,res){
    try{
        let templated = req.query.templated_id
        let text0 = req.query.text0 
        let text1 = req.query.text1
        var options = {
        method: "post",
        url: `https://api.imgflip.com/caption_image?template_id=222403160&text0=${text0}&text1=${text1}&username=chewie12345&password=meme@123`
       }
     let result = await axios(options)
     console.log(result.data)
     res.status(200).send({ msg: result.data })
}
   catch (err) {
    console.log(err)
    res.status(500).send({ status: false , msg: "server error" })
   }
}

///////////////////////////////////////////// assignment 2 //////////////////////////////////////////////////////////

let sortedCities = async function (req,res){
    try{
        let cities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArry=[ ]

        for(i=0;i<cities.length;i++){
            let obj = {city:cities[i]} // city : bengalore
            let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=53b6e11bd9676b9afef4cabae636a9d8`)
            console.log(resp.data.main.temp)

            obj.temp=resp.data.main.temp
            cityObjArry.push(obj)
        }
     //sorted the arr of object based on numeric property :-
        let sorted = cityObjArry.sort( function(a,b) { return a.temp-b.temp})
        console.log(sorted)
        res.status(200).send({status:true, data:sorted})
    
    }  catch (err) {
        console.log(err)
        res.status(500).send({ status: false , msg: "server error" })
       }
    }
    



module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getdistrictByID = getdistrictByID
module.exports.memeHandeler = memeHandeler
module.exports.sortedCities = sortedCities