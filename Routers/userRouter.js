const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");
const {
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const {
  signup,
  login,
  isAuthorised,
  protectRoute,
  forgetPassword,
  resetPassword,
  logout,
} = require("../controller/authController");
// const protectRoute = require("./authHelper");

//user ke options

userRouter.route("/signup").post(signup);

userRouter.route("/login").post(login);

userRouter.route("/forgetpassword").post(forgetPassword);

userRouter.route("/resetpassword/:token").post(resetPassword);

userRouter.route("/logout").get(logout);

//multer for file upload

// upload-> storage , filter
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cd) {
//     cb(null, "public/image");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `user-${Date.now()}.jpeg`);
//   },
// });

// const filter = function (req,file,cb){
//   if(file.mimetype.startsWith('image')){
//     cb(null,true)
//   }
//   else {
//     cb(new Error("Not an Image! Please upload an Image"),false);
//   }
// }

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: filter,
// });

//profile page
userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

// userRouter.post("/ProfileImage",upload.single('photo'),update);
//get request 
// userRouter.get("/ProfileImage",(req,res)=>{
//   res.sendFile("")
// })

//admin specific
userRouter.use(isAuthorised(["admin"]));
userRouter.route("/").get(getAllUser);

module.exports = userRouter;

// userRouter.route("/getCookies").get(getCookies);
// userRouter.route("/setCookies").get(setCookies);
