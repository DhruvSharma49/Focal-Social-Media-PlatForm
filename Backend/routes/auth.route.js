const express = require("express");
const User = require("../module/user.module");
const jwt = require("jsonwebtoken");
const { encrypted, decrypt } = require("../utilities/password");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(403).json({ error: "Please Fill all the fields" });
  }
  const isEmailFoundOrNot = await User.exists({ email });
  if (isEmailFoundOrNot) {
    return res.status(400).json({ error: "Email Already Exists" });
  } else {
    const encpassword = await encrypted(password);
    const user = new User({ email, password: encpassword, name });
    await user.save();
    return res.status(200).json({ msg: "User Created Successfully" });
  }
});

router.post("/login", async (req, res) => {
  //Algo

  // Get the Email and Password
  // 1. check the email is exists or not
  // 2. If email is exists check the password is correct
  // 3. check the password with bcrypto algo
  // 4 . if the password is correct then we create a jwt token and send the user

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: "Please Fill all the Fields" });
  }
  const user = await User.findOne({ email });
  if (user) {
    const isPasswordCorrectOrNot = await decrypt(password, user.password);
    if (isPasswordCorrectOrNot) {
      //return the jwt token
      user.password = undefined;
      const token = await jwt.sign({ user }, process.env.SECRET_KEY);
      console.log("user login successfuly")
      return res.status(200).json({ token,user  });
    } else {
      return res.status(401).json({ error: "Invalid Password" });
    }
  } else {
    return res.status(401).json({ error: "Email is not exists" });
  }
});

module.exports = router;
