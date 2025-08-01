const Product = require("../models/Product");

const createProduct = async (req, res) => {
  // if (req.user?.isAdmin) {
  try {
    const productExists = await Product.findOne({ title: req.body.title });
    productExists && res.status(403).json("product already exists");
    await new Product(req.body).save();
    res.status(201).json("product created successfully");
  } catch (error) {
    res.status(500).json(error);
  }
  // } else {
  //   res.status(403).json("Access denied. Cannot create products.");
  // }
};

const getAllProducts = async (req, res) => {
  const categoryQuery = req.query?.category;
  const homePageQuery = req.query?.homePage
    ? JSON.parse(req.query.homePage)
    : "";
  const relatedItemsQuery = req.query?.relatedItems
    ? JSON.parse(req.query.relatedItems)
    : "";
  let products;

  try {
    if (categoryQuery !== "All") {
      if (relatedItemsQuery) {
        products = await Product.find({ category: categoryQuery }).limit(3);
      } else {
        products = await Product.find({ category: categoryQuery });
      }
    } else if (categoryQuery === "All" && homePageQuery) {
      products = await Product.find().limit(6);
    } else if (!categoryQuery || categoryQuery === "All") {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  // if (req.user?.isAdmin) {
  try {
    await Product.findByIdAndUpdate(id, { $set: body }, { new: true });
    res.status(200).json("product updated successfully");
  } catch (error) {
    res.status(500).json(error);
  }
  // } else {
  //   res.status(403).json("access denied. cannot update products.");
  // }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  // if (req.user?.isAdmin) {
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json("product deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
  // } else {
  //   res.status(403).json("access denied. cannot delete products.");
  // }
};

module.exports = {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
