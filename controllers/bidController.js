const Bid = require("../models/Bid");

exports.createBid = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    // create a new bid
    const bid = await Bid.create({ userId, amount });
    res.json(bid);
    // console.log("Bid Data Saved");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create bid" });
  }
};
