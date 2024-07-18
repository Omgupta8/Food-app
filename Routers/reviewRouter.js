const express = require("express");
const reviewModel = require("../models/reviewModel");
const { protectRoute } = require("../controller/authController");
const reviewRouter = express.Router();
const {getAllReviews,top3Reviews,getPlanReviews,createReview,updatePlanReview,deleteReview}=require('../controller/reviewController');

reviewRouter.route("/all").get(getAllReviews);

reviewRouter.route("/top3").get(top3Reviews);

reviewRouter.route("/:id").get(getPlanReviews);

reviewRouter.use(protectRoute);
reviewRouter.route("/crudReview/:plan").post(createReview).patch(updatePlanReview)
.delete(deleteReview);

module.exports=reviewRouter; 