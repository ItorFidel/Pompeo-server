const express = require("express");
const router = express.Router();
const KPI = require("../models/KPI");
const verify = require("../middleware/verifyToken");

router.get("/", async (req, res) => {
  // if (req.user?.isAdmin) {
  try {
    const kpis = await KPI.find();
    res.status(200).json(kpis);
  } catch (error) {
    res.status(500).json(error);
  }
  // } else {
  //   res.status(403).json("Access denied. Cannot access kpis.");
  // }
});

module.exports = router;
