const Bid = require("../models/Bid");

exports.createBid = async (req, res) => {
  const { bidId, userId, amount, productId } = req.body;

  try {
    // create a new bid
    const bid = await Bid.create({ bidId, userId, amount, productId });
    res.json(bid);
    // console.log("Bid Data Saved");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create bid" });
  }
};

exports.showBid = async (req, res) => {
  try {
    Bid.find({}, function (err, collection) {
      console.log("Bid Data Retrived");
      res.send(collection);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to retrieve bid data" });
  }
};
