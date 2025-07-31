const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  loginAdmin,
  logoutUser,
} = require("../controllers/authController");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/admin/login", loginAdmin);
router.post("/admin/logout", logoutUser);

module.exports = router;
