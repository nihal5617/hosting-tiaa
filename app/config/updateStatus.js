import Product from "../models/product.js";

const updateStatus = async () => {
  const currentDate = new Date();
  try {
    const products = await Product.find();
    products.forEach(async (product) => {
      const { endDate, _id } = product;
      if (endDate < currentDate) {
        product.auctionStatus = "Completed";
        const bids = product.bids;
        if (product.type === "Construction") {
          let lowestBid = 1000000;
          let lowestBidder = null;
          bids.forEach((bid) => {
            if (bid.bidAmount < lowestBid) {
              lowestBid = bid.bidAmount;
              lowestBidder = bid.bidBy;
            }
          });
          product.boughtBy = lowestBidder;
          product.finalPrice = lowestBid;
          await product.save();
        } else {
          let highestBid = 0;
          let highestBidder = null;
          bids.forEach((bid) => {
            if (bid.bidAmount > highestBid) {
              highestBid = bid.bidAmount;
              highestBidder = bid.bidBy;
            }
          });
          product.boughtBy = highestBidder;
          product.finalPrice = highestBid;
          await product.save();
        }
      }
    });
    return res.status(200).json({ success: "Status updated successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default updateStatus;
