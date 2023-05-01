const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  bidId: { type: String, required: true },
  userId: { type: String, required: true },
  amount: { type: Number, required: true, unique: true },
  productId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;
