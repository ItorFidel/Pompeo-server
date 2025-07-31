const Transaction = require("../models/Transaction");

const createTransaction = async (req, res) => {
  if (req.user?.isAdmin) {
    try {
      const transactionExists = await Transaction.findOne({
        id: req.body.id,
      });
      transactionExists && res.status(403).json("Transaction already exists");
      await new Transaction(req.body).save();
      res.status(201).json("Transaction created successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied. Cannot create transactions.");
  }
};

const getAllTransactions = async (req, res) => {
  const idQuery = req.query.id;
  const buyerQUery = req.query.buyer;
  const recentQUery = req.query.recent;
  let transactions;

  // if (req.user?.isAdmin) {
  try {
    if (idQuery) {
      transactions = await Transaction.find({ id: idQuery }).populate(
        "products"
      );
    } else if (buyerQUery) {
      transactions = await Transaction.find({ buyer: buyerQUery })
        .populate("products")
        .sort({
          createdAt: -1,
        });
    } else if (recentQUery) {
      transactions = await Transaction.find()
        .populate("products")
        .sort({
          createdAt: -1,
        })
        .limit(6);
    } else {
      transactions = await Transaction.find()
        .populate("products")
        .populate({
          path: "products",
          populate: { path: "transactions", model: "Transaction" },
        })
        .sort({
          createdAt: -1,
        });
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
  // } else {
  //   res.status(403).json("Access denied. Cannot access transactions.");
  // }
};

const getOneTransaction = async (req, res) => {
  const id = req.params.id;

  if (req.user?.isAdmin) {
    try {
      const transaction = await Transaction.findById(id);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied. Cannot access transactions.");
  }
};

const updateTransaction = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (req.user?.isAdmin) {
    try {
      await Transaction.findByIdAndUpdate(id, { $set: body }, { new: true });
      res.status(200).json("transaction updated successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied. Cannot update transactions.");
  }
};

const deleteTransaction = async (req, res) => {
  const id = req.params.id;

  // if (req.user?.isAdmin) {
  try {
    await Transaction.findByIdAndDelete(id);
    res.status(200).json("transaction deleted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
  // } else {
  //   res.status(403).json("Access denied. Cannot delete transactions.");
  // }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getOneTransaction,
  updateTransaction,
  deleteTransaction,
};
