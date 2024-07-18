const express=require('express');
const bookingRouter=express.Router();
const { createSession } = require("../controller/bookingController");
const {protectRoute}=require('../controller/authController');

bookingRouter.post('/createSession',protectRoute,createSession);
bookingRouter.get('/createSession',function(req,res){
    // const BookingPage='booking.html';
    // console.log(req.protocol);
    res.sendFile('booking.html',{root:'.'});
});

module.exports=bookingRouter; 