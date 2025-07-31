const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  date: String,
  revenue: String,
  expenses: String,
});

const monthSchema = new mongoose.Schema({
  month: String,
  revenue: String,
  expenses: String,
  operationalExpenses: String,
  nonOperationalExpenses: String,
});

const KpiSchema = new mongoose.Schema(
  {
    totalProfit: String,
    totalRevenue: String,
    totalExpenses: String,
    expensesByCategory: {
      type: Map,
      of: String,
    },
    dailyData: [daySchema],
    monthlyData: [monthSchema],
  },
  { timestamps: true }
);

const KPI = mongoose.model("KPI", KpiSchema);

module.exports = KPI;
