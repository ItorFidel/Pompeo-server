const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  cartItems: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      count: Number,
    },
  ],
  cartTotalQuantity: { type: Number, required: true },
  cartTotalAmount: { type: Number, required: true },
});

const ordersSchema = new mongoose.Schema({
  current: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
});

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: String,
    cart: cartSchema,
    orders: ordersSchema,
    isAdmin: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
