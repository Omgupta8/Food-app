const userModel = require("../models/userModel.js");

module.exports.getAllUser = async function getUsers(req, res) {
  // console.log(req.query);
  try {
    let allUsers = await userModel.find();
    if (allUsers) {
      res.json({
        message: "list of all the users",
        data: allUsers,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
  // res.send(users);
};

// module.exports.postUser = function postUser(req, res) {
//   // console.log(req.body);
//   // res.send("Data received");
//   // res.send(req.body);
//   console.log(req.body);
//   users = req.body;
//   res.json({
//     message: "data receives",
//     user: req.body,
//   });
// };

module.exports.updateUser = async function patchUser(req, res) {
  console.log("req.body -> ", req.body);
  //update data in users obj 
  try {
    let id = req.params.id;
    let user = await userModel.findById(id); 
    let dataToBeUpdated = req.body;
    if (user) {
      // const keys = [];
      // for (let key in dataToBeUpdated) {
      //   keys.push(key);
      // }
      // for (let i = 0; i < keys.length; i++) {
      //   user[keys[i]] = dataToBeUpdated[keys[i]];
      // }
      let data=await userModel.findByIdAndUpdate(id,dataToBeUpdated);
      // console.log(user);
      // await user.save(); 
      // const updatedData = await user.save();
      res.json({
        message: "data updated successfully",
        data: data,
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }

  // let user = await userModel.findOneAndUpdate(dataToBeUpdated);
  // for (key in dataToBeUpdated) {
  //   users[key] = dataToBeUpdated[key];
  // }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  // users = {};
  try {
    let id = req.params.id;
    // let dataToBeDeleted = req.body;
    let user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: "user not found",
      });
    }
    res.json({
      message: "data has been deleted",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getUser = async function getUserById(req, res) {
  let id = req.id;
  // console.log(req.id);
  let user = await userModel.findById(id);
  if (user) {
    return res.json(user);
  } else {
    return res.json({
      message: "user not found",
    });
  }
};

//   function setCookies(req, res) {
//     // res.setHeader("Set-Cookie", "isLoggedIn=true");
//     res.cookie("isLoggedIn", true, {
//       maxAge: 1000 * 60 * 60 * 24,
//       secure: true,
//       httpOnly: true,
//     });
//     res.cookie("isPrimeMember", true); //security issue as it can we loaded in console
//     res.send("Cookies has been set");
//   }

//   function getCookies(req, res) {
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send("cookies received");
//   }
