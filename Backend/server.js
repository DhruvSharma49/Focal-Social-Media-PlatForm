const dotenv = require("dotenv");
const express = require("express");
const connection = require("./src/DataBase/connection.db");
const cors = require('cors');  
const cookieParser=require('cookie-parser');
const app = express();
dotenv.config();
connection();

app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(cookieParser())
const authRoutes = require("./src/routes/auth.route");


app.use("/user",authRoutes);
app.use("/post", require("./src/routes/post.route"));
app.use("/interact",require('./src/routes/user.route'))
app.use("/createstory",require('./src/routes/story.route'))


const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
  