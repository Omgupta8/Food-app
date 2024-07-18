const express = require("express");

const app = express();

app.use(express.json());

app.listen(3000);

let users = [
  {
    id: 1,
    name: "Om",
  },
  {
    id: 2,
    name: "Kartik",
  },
  {
    id: 3,
    name: "Abhay",
  },
];
// mini app
const userRouter = express.Router();
const authRouter = express.Router();
app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(patchUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

authRouter.route("/signup").get(getSignUp).post(postSignUp);

// app.get("/user", getUser);

// app.post("/user", postUser);

// // update -> patch
// app.patch("/user", patchUser);

// //delete
// app.delete("/user", deleteUser);

// // params
// app.get("/user/:id", getUserById);

function getUser(req, res) {
  console.log(req.query);

  res.send(users);
}

function postUser(req, res) {
  console.log(req.body);
  // res.send("Data received");
  // res.send(req.body);
  console.log(req.body);
  users = req.body;
  res.json({
    message: "data receives",
    user: req.body,
  });
}

function patchUser(req, res) {
  console.log("req.body -> ", req.body);
  //update data in users obj

  let dataToBeUpdated = req.body;
  for (key in dataToBeUpdated) {
    users[key] = dataToBeUpdated[key];
  }

  res.json({
    message: "data updated successfully",
  });
}

function deleteUser(req, res) {
  users = {};
  res.json({
    message: "data has been deleted",
  });
}

function getUserById(req, res) {
  console.log(req.params.id);
  console.log(req.params);
  res.send("user id received");
}

function getSignUp(req,res){
  res.sendFile('/public/index.html',{root:__dirname});
}

function postSignUp(req,res){
  let obj=req.body;
  
  res.json({
    message:"user signed up",
    data:obj
  });
}