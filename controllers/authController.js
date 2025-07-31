const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(403)
        .json({ type: "emailError", message: "email already exists" });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(403).json({
        type: "usernameError",
        message: "username already exists",
      });
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    ).toString();

    await new User({ ...req.body, password: encryptedPassword }).save();
    res.status(201).json("User created successfully");
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password: reqPassword, keepSignedIn } = req.body;

  if (!email && !reqPassword) {
    return res
      .status(400)
      .json({ type: "stdError", message: "Please enter all fields" });
  }

  const validUser = await User.findOne({ email });
  if (!validUser) {
    return res
      .status(400)
      .json({ type: "emailError", message: "Incorrect email" });
  }

  const validUserPassword = CryptoJS.AES.decrypt(
    validUser.password,
    process.env.SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);

  if (reqPassword !== validUserPassword) {
    return res
      .status(400)
      .json({ type: "passwordError", message: "Incorrect password" });
  }

  await validUser.populate("cart.cartItems.item");

  const { password, ...data } = validUser._doc;

  const token = jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: keepSignedIn ? "336h" : "48h",
  });

  try {
    const expires = new Date().setTime(
      new Date().getTime() + (keepSignedIn ? 336 : 48) * 3600 * 1000
    );

    res
      .status(200)
      .cookie("auth", token, {
        path: "/",
        sameSite: "strict",
        secure: true,
        httpOnly: true,
        expires: new Date(expires),
      })
      .json({
        ...data,
        expires,
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginAdmin = async (req, res) => {
  const { email, password: reqPassword, keepSignedIn } = req.body;

  if (!email && !reqPassword) {
    return res
      .status(400)
      .json({ type: "stdError", message: "Please enter all fields" });
  }

  const validUser = await User.findOne({ email });
  if (!validUser) {
    return res
      .status(400)
      .json({ type: "emailError", message: "Incorrect email" });
  }

  const validUserPassword = CryptoJS.AES.decrypt(
    validUser.password,
    process.env.SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);

  if (reqPassword !== validUserPassword) {
    return res
      .status(400)
      .json({ type: "passwordError", message: "Incorrect password" });
  }

  if (validUser.isAdmin) {
    const { password, ...data } = validUser._doc;

    const token = jwt.sign(data, process.env.SECRET_KEY, {
      expiresIn: keepSignedIn ? "336h" : "48h",
    });

    try {
      const host = req.get("host");
      const expires = new Date().setTime(
        new Date().getTime() + (keepSignedIn ? 336 : 48) * 3600 * 1000
      );

      res
        .status(200)
        .cookie("auth", token, {
          path: "/",
          sameSite: "none",
          secure: true,
          httpOnly: true,
          domain: host,
          expires: new Date(expires),
        })
        .json({
          ...data,
          expires,
        });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json({
      type: "adminError",
      message: "Only admin users can login here.",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.status(200).clearCookie("auth").json("user logged out successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createUser, loginUser, loginAdmin, logoutUser };
