const jwt = require("jsonwebtoken");

module.exports = {
  signAccessToken: (user) => {
    return new Promise((resolve, reject) => {
      const payload = { user };
      const options = {
        expiresIn: "1d",
      };
      jwt.sign(payload, process.env.JWT_SECRET_KEY, options, (err, token) => {
        console.log(token);
        if (err) reject(err);
        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    console.log(req.headers["authorization"]);
    if (!req.headers["authorization"])

      return res.json({ message: "Access Denied" });
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    if (token === "null") {
      res.json({ message: "Access Denied" })
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) return res.json({ message: err });
      next();
    });
  },
};
