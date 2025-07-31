const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const transactionRoute = require("./routes/transaction");
const kpiRoute = require("./routes/kpi");
const cookieParser = require("cookie-parser");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  const corsWhitelist = ["http://localhost:5173", "http://localhost:5174"];
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authorization"
    );
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  }

  next();
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/kpi", kpiRoute);

// run server
connectDB(app);
