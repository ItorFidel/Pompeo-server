const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getAllUsers);
router
  .route("/:id")
  .get(getOneUser)
  .put(verify, updateUser)
  .delete(verify, deleteUser);

module.exports = router;
