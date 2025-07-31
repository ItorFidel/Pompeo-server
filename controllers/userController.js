const User = require("../models/User");
const CryptoJS = require("crypto-js");

const getAllUsers = async (req, res) => {
  // if (req.user?.isAdmin) {
  const newUsersQuery = req.query?.newUsers;
  let users;

  try {
    if (newUsersQuery) {
      users = await User.find()
        .populate({
          path: "cart.cartItems.item",
        })
        .sort({ createdAt: -1 })
        .limit(10);
    } else {
      users = await User.find()
        .populate({
          path: "cart.cartItems.item",
        })
        .sort({ createdAt: -1 });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
  // } else {
  //   res.status(403).json("Access denied. Cannot access users.");
  // }
};

const getOneUser = async (req, res) => {
  const paramsId = req.params.id;
  const reqUserId = req.user?.id;

  // if (req.user?.isAdmin || paramsId === reqUserId) {
  try {
    const user = await User.findById(paramsId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
  // } else {
  //   res.status(403).json("Access denied. Cannot access this user.");
  // }
};

const updateUser = async (req, res) => {
  let body = req.body;
  const reqUser = req.user;
  const paramsUser = await User.findById(req.params.id);

  const paramsUserPassword = CryptoJS.AES.decrypt(
    paramsUser.password,
    process.env.SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);

  if (body.password && body.password !== paramsUserPassword) {
    body = {
      ...body,
      password: CryptoJS.AES.encrypt(
        body.password,
        process.env.SECRET_KEY
      ).toString(),
    };
  } else {
    body = { ...body, password: paramsUser.password };
  }

  try {
    await User.updateOne(
      { _id: paramsUser._id },
      { $set: body },
      { new: true }
    );
    res.status(200).json("user updated succssfully.");
  } catch (error) {
    res.status(500).json(error);
  }

  // if (reqUser?._id === paramsUser._id) {
  //   const reqUserPassword = CryptoJS.AES.decrypt(
  //     reqUser.password,
  //     process.env.SECRET_KEY
  //   ).toString(CryptoJS.enc.Utf8);

  //   if (body.password && body.password !== reqUserPassword) {
  //     body = {
  //       ...body,
  //       password: CryptoJS.AES.encrypt(
  //         body.password,
  //         process.env.SECRET_KEY
  //       ).toString(),
  //     };
  //   } else {
  //     body = { ...body, password: paramsUser.password };
  //   }

  //   try {
  //     await User.updateOne(
  //       { _id: paramsUser._id },
  //       { $set: body },
  //       { new: true }
  //     );
  //     res.status(200).json("user updated succssfully.");
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // } else if (reqUser?.isAdmin) {
  //   const paramsUserPassword = CryptoJS.AES.decrypt(
  //     paramsUser.password,
  //     process.env.SECRET_KEY
  //   ).toString(CryptoJS.enc.Utf8);

  //   if (body.password && body.password !== paramsUserPassword) {
  //     body = {
  //       ...body,
  //       password: CryptoJS.AES.encrypt(
  //         body.password,
  //         process.env.SECRET_KEY
  //       ).toString(),
  //     };
  // } else {
  //   body = { ...body, password: paramsUser.password };
  //   }

  //   try {
  //     await User.updateOne(
  //       { _id: paramsUser._id },
  //       { $set: body },
  //       { new: true }
  //     );
  //     res.status(200).json("user updated succssfully.");
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // } else {
  //   res.status(403).json("Access denied. Cannot update users.");
  // }
};

const deleteUser = async (req, res) => {
  const paramsId = req.params.id;
  const reqUserId = req.user.id;

  // if (req.user?.isAdmin || paramsId === reqUserId) {
  try {
    await User.findByIdAndDelete(paramsId);
    res.status(200).json("user deleted successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
  // } else {
  //   res.status(403).json("Access denied. Cannot update users.");
  // }
};

module.exports = { getAllUsers, getOneUser, updateUser, deleteUser };
