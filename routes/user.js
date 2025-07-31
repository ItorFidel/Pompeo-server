const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// router.route("/").get(verify, getAllUsers);
router.route("/").get(getAllUsers);
router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);
// .get(verify, getOneUser)
// .put(verify, updateUser)
// .delete(verify, deleteUser);

module.exports = router;
