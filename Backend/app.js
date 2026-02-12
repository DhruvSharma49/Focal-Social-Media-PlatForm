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

app.use("/user", authRoutes);
app.use("/post", require("./src/routes/post.route"));
app.use("/interact", require("./src/routes/user.route"));
app.use("/createstory", require("./src/routes/story.route"));

module.exports=app;


