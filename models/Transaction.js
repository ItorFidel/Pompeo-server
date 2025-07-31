const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    buyer: { type: String, required: true },
    amount: { type: String, required: true },
    products: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      required: true,
    },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
