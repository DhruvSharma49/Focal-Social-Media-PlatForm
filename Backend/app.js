const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();

app.use(express.json({ limit: "16kb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

const authRoutes = require("./src/routes/auth.route");
const postRoutes=require("./src/routes/post.route");
const interactRoutes=require("./src/routes/user.route");
const storyRoute=require("./src/routes/story.route");

app.use("/user", authRoutes);
app.use("/post",postRoutes);
app.use("/interact",interactRoutes);
app.use("/createstory",storyRoute);

module.exports=app;


