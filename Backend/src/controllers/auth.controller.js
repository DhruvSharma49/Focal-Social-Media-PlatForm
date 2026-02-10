const User = require("../module/user.model");
const jwt = require("jsonwebtoken");
const { encrypted, decrypt } = require("../utils/password");

// ================= SIGNUP =================
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(403).json({ error: "Please fill all fields" });
    }

    const isEmailFound = await User.exists({ email });
    if (isEmailFound) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const encpassword = await encrypted(password);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const usernameBase = name.replace(/\s+/g, "").toLowerCase();
    let username = usernameBase + randomNum;

    while (await User.exists({ username })) {
      const rand = Math.floor(1000 + Math.random() * 9000);
      username = usernameBase + rand;
    }

    const user = new User({ name, username, email, password: encpassword });
    await user.save();

    user.password = undefined;

    return res.status(200).json({
      msg: "User created successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "Please Fill all the Fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Email does not exist" });
    }

    const isPasswordCorrectOrNot = await decrypt(password, user.password);

    if (!isPasswordCorrectOrNot) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    user.password = undefined;

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    console.log("User login successfully");

    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }
};
