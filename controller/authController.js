const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utility/nodemailer");
// const JWT_KEY = require("../secrets.js");
const JWT_KEY = "wdin3rknflse34grsk";

// sign up user
module.exports.signup = async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    // console.log(user);
    sendMail("singup",user);
    if (user) {
      return res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "error while signup",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
  // let obj = req.body;
  // console.log("backend", obj);
  // res.json({
  //   message: "user signed up",
  //   data: obj,
  // });
};

// login user
module.exports.login = async function login(req, res) {
  try {
    // console.log('hello');
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        // use bcrypt later
        if (user.password == data.password) {
          let uid = user["_id"];
          let token = jwt.sign({ payload: uid }, JWT_KEY);
          res.cookie("login", token, { httpOnly: true });
          return res.json({
            message: "User logged In ",
            userDetails: data,
          });
        } else {
          return res.json({
            message: "Wrong Credentials",
          });
        }
      } else {
        return res.json({
          message: "Email not found",
        });
      }
    } else {
      return res.json({
        message: "Enter required field",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

// isAuthorised -> to check the user's role

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "operation not allowed",
      });
    }
  };
};

//protect Route
module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    // console.log('hello');
    let token;
    if (req.cookies.login) {
      // console.log(req.cookies);
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);
      // console.log(payload);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
        //   console.log(payload);
      } else {
        res.json({
          message: "user not verified",
        });
      }
    } else {
      const client=req.get('User-Agent');
      if(client.includes('Mozilla')==true){
        return res.redirect('/login');
      }
      return res.json({
        message: "User not logged in",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//forget Password
module.exports.forgetPassword = async function forgetPassword(req, res) {
  let { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      // resetToken is used to create new token to identify the user
      const resetToken = user.createResetToken();
      // hhtps://abc.com/resetpassword/resetToken
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${resetToken}`;
      // send the email to the user using nodemailer
      let obj={
        resetPasswordLink:resetPasswordLink,
        email :email
      };
      sendMail('resetpassword',obj);
    } else {
      res.json({
        message: "please signup",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//reset Password
module.exports.resetPassword=async function resetPassword(req, res) {
  try {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "User password changed successfully",
      });
    } else {
      res.json({
        message: "Please signup",
      });
    }
    //resetPassword
  } catch (errr) {
    res.json({
      message: err.message,
    });
  }
}

module.exports.logout=function logout(req,res){
  res.cookie('login',' ',{maxAge:1});
  res.json({
    message:'user logged out successfully'
  });
}

