
// const jwt = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     return res.status(401).json({ error: "You must be logged in" });
//   }
//   // console.log("authorization", authorization);
//   const token = authorization.replace("Bearer ", "");
//     //  console.log("token",token)
//   const tokenisVerifedOrNot = jwt.verify(token, process.env.SECRET_KEY);
//   // console.log(tokenisVerifedOrNot);
//   req.user = tokenisVerifedOrNot.user;
//   next();
// };

  
  const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized. No token provided." });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Invalid token format." });
    }
console.log("authorization", req.headers.authorization);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded.user;
    next();

  } catch (err) {
    return res.status(401).json({ error: "Token is invalid or expired." });
  }
};
