const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;
