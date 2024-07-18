// app.get("/", function (req, res) {
//   res.sendFile("./views/index.html",{root:__dirname});
// });

// app.get("/about", (req, res) => {
//   res.sendFile("./views/about.html", { root: __dirname });
// });

// //redirects

// app.get('/about-us',(req,res)=>{
//     res.status(301).redirect("/about");
// })

// app.get('/home',(req,res)=>{
//     res.status(301).redirect("/");
// })

// //404 error
// app.use((req,res)=>{
//     res.status(404).sendFile('./views/404.html',{root:__dirname});
// })

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.listen(3000);
app.use(cookieParser());

// mini app
const userRouter = require("./Routers/userRouter");
const planRouter = require("./Routers/planRouter");
// const authRouter = require("./Routers/authRouter");
const reviewRouter = require("./Routers/reviewRouter");
const bookingRouter=require("./Routers/bookingRouter");

app.use("/user", userRouter);
app.use("/plans",planRouter);
app.use("/review",reviewRouter);
app.use("/booking",bookingRouter);
// app.use("/auth", authRouter);

// app.get("/user", getUser); 

// app.post("/user", postUser);

// // update -> patch
// app.patch("/user", patchUser);

// //delete
// app.delete("/user", deleteUser);

// // params
// app.get("/user/:id", getUserById);