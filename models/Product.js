const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    desc: { type: String },
    category: { type: String, required: true },
    trackNumber: { type: Number, required: true },
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
