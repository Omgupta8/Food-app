const express = require("express");
const planRouter = express.Router();
const planModel = require("../models/planModel");
const {protectRoute, isAuthorised}=require('../controller/authController');
const {getAllPlans,getPlan,createPlan,updatePlan,deletePlan,top3Plans}=require('../controller/planController');

//all plans
planRouter.route("/allPlans").get(getAllPlans);


// // My current plan 
planRouter.use(protectRoute);
planRouter.route("/plan/:id").get(getPlan);


// admin nd restaurant owner can only create/update/delete plans 
planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter.route("/crudPlan").post(createPlan);
planRouter.route("/crudPlan/:id").patch(updatePlan).delete(deletePlan);

// top 3 plan 
planRouter.route('/top3').get(top3Plans);

module.exports=planRouter;