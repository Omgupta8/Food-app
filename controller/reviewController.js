const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");
const { updatePlan } = require("../controller/planController");

module.exports.getAllReviews = async function getAllReviews(req, res) {
  try {
    const reviews = await reviewModel.find();
    if (reviews) {
      return res.json({
        message: "reviews retrieved",
        data: reviews,
      });
    } else {
      return res.json({
        message: "review not found",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

module.exports.top3Reviews = async function top3Reviews(req, res) {
  try {
    const reviews = await reviewModel.find().sort({ rating: -1 }).limit(3);
    if (reviews) {
      return res.json({
        message: "top 3 reviews retrieved",
        data: reviews,
      });
    } else {
      return res.json({
        message: "reviews not found",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
  try {
    let planid = req.params.id;
    // console.log(req.body); 

    // Method 1
    // const plan = await planModel.findById(planid);
    // var review = await reviewModel.find({plan:plan});

    // Method 2
    const reviews = await reviewModel.find();
    const review = reviews.filter((review) => {
      return review.plan._id == planid;
    });

    if (review) {
      return res.json({
        message: "review retrieved",
        data: review,
      });
    } else {
      return res.json({
        message: "review not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.createReview = async function createReview(req, res) {
  try {
    let id = req.params.plan;
    // console.log(req.body);
    // console.log(req.body); 
    let plan = await planModel.findById(id);
    if (plan) {
      let review = await reviewModel.create(req.body);
      // plan.ratingAverage=(ratingAverage+req.rating)/
      await plan.save();
      return res.json({
        message: "review created",
        data: review,
      });
    } else {
      return res.json({
        message: "plan not found",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

module.exports.updatePlanReview = async function updateReview(req, res) {
  try {
    let planid = req.params.id;
    // review id from the frontend
    let id=req.body.id;

    let review = await reviewModel.findById(id);
    let dataToBeUpdated = req.body;
    let keys = [];
    for (let key in dataToBeUpdated) {
      if(key=='id') continue;
      keys.push(key);
    }
    for (let i = 0; i < keys.length; i++) {
      review[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await review.save();
    return res.json({
      message: "plan updated successfully",
      data: review,
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

module.exports.deleteReview = async function deleteReview(req, res) {
  try { 
    let planid = req.params.id;
    // review id from the frontend
    let id=req.body.id;
    // console.log(req.body);
    let review = await reviewModel.findByIdAndDelete(id);
    return res.json({
      message: "review deleted",
      data: review,
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};
