const express = require("express");
const verify = require("../middleware/verifyToken");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/").post(createProduct).get(getAllProducts);
// router.route("/").post(verify, createProduct).get(getAllProducts);
router
  .route("/:id")
  .get(getOneProduct)
  .put(updateProduct)
  .delete(deleteProduct);
// .put(verify, updateProduct)
// .delete(verify, deleteProduct);

module.exports = router;
