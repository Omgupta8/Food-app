// mongoose ke through connect mongodb
const mongoose = require("mongoose");
const db_link = "mongodb+srv://om_gupta:hello@cluster0.wa3axux.mongodb.net/";

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("plan db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "plan name should not exceed more than 20 characters"],
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "price not entered"],
  },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount < 100;
      },
      "discount should not exceed price",
    ],
  },
  ratingAverage: {
    type: Number,
  },
});

// model
const planModel = mongoose.model("planModel", planSchema);

// (async function createPlan() {
//   let planObj = {
//     name: "SuperFood1",
//     duration: 30,
//     price: 1000,
//     ratingAverage: 5,
//     discount: 20,
//   };
//   // let data = await planModel.create(planObj);
//   // console.log(data);
//   const doc = new planModel(planObj);
//   await doc.save();
// })();

module.exports = planModel;