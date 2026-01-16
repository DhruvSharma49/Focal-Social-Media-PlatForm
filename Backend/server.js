const dotenv = require("dotenv");
const express = require("express");
const connection = require("./DataBase/connection.db");
const cors = require('cors');  
const app = express();
app.use(cors());
dotenv.config();
connection();

app.use(express.json());
app.use("/user", require("./routes/auth.route"));
app.use("/post", require("./routes/post.route"));
app.use("/interact",require('./routes/user.route'))
app.use("/createstory",require('./routes/story.route'))


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
  