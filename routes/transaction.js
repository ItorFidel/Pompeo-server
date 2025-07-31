const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");
const {
  createTransaction,
  getAllTransactions,
  getOneTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionControler");

router.route("/").post(verify, createTransaction).get(getAllTransactions);

router
  .route("/:id")
  .get(verify, getOneTransaction)
  // .put(verify, updateTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
