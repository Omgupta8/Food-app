//mongoDB
const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const db_link = "mongodb+srv://om_gupta:hello@cluster0.wa3axux.mongodb.net/";

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("user db connected");
    // console.log((db));
  })
  .catch(function (err) {
    console.log(err);
  });

//creating schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  confirmPassword: {
    type: String,
    required: true,
    min: 5,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "restaurantowner", "deliveryboy"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "img/users/default.jpeg",
  },
  resetToken: String,
});

// HOOKS

userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});

// userSchema.pre("save", async function () {
//   let salt = await bcrypt.genSalt();
//   let hashedString = await bcrypt.hash(this.password, salt);
//     console.log(hashedString);
//   this.password = hashedString;
// });

userSchema.methods.createResetToken = function () {
  //creating uniwue token using npm i crypto
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken;
};

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;
  this.resetToken = undefined;
};

// // before storing
// userSchema.pre("save", function () {
//   console.log("before saving in db", this);
// });
// //after storing
// userSchema.post("save", function (doc) {
//   console.log("after saving in db", doc);
// });
// //remove

// MODEL
//model
const userModel = mongoose.model("userModel", userSchema);

// (async function createUser() {
//   let user = {
//     name: "Rohan",
//     email: "abcd@gmail.com",
//     password: "123456",
//     confirmPassword: "123456",
//   };
//   let data=await userModel.create(user);
//   console.log(data);
// })();

module.exports = userModel;
