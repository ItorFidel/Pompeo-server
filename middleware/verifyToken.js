const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const token = req.cookies.auth;

  console.log(token);
  console.log(req.cookies);

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      err && res.status(403).json("token is invalid");
      req.user = data;
      next();
    });
  } else {
    res.status(401).json("Access is forbidden. No tokens Provided.");
  }
};

module.exports = verify;
