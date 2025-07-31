const mongoose = require("mongoose");
const port = 9000;

const connectDB = async (app) => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connection successful");
    app.listen(process.env.PORT || port, () =>
      console.log(`server running on port ${process.env.PORT || port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
