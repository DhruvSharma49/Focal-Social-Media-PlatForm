
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  console.log("authorization", authorization);
  const token = authorization.replace("Bearer ", "");
     console.log("token",token)
  const tokenisVerifedOrNot = jwt.verify(token, "catsAndDogs");
  console.log(tokenisVerifedOrNot);
  req.user = tokenisVerifedOrNot.user;
  next();
};
