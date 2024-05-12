const jwt = require("jsonwebtoken");
const APIResponseFormat = require("../utils/APIResponseFormat");




module.exports = {
    isSignedIn :(req, res, next) => {
      const token = req.headers["authorization"]
        ? req.headers["authorization"].trim().split(" ")[1]
        : null;
  
      if (!token) {
        return res.status(400).json({
          success: false,
          status: 401,
          message: "User is not authorized for this operation",
        });
      }
  
      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
      } catch (error) {
        return res.status(401).json({
          success: false,
          status: 401,
          message: "User is not authorized for this operation",
        });
      }
      return next();
    }
};