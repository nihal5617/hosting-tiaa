import Product from "../models/product.js";

const updateStatus = async () => {
  const currentDate = new Date();
  try {
    const products = await Product.find();
    products.forEach(async (product) => {
      const { endDate, _id } = product;
      if (endDate < currentDate) {
        // change status to completed
        product.auctionStatus = "Completed";
        // find the highest bid and update the boughtBy field
        const bids = product.bids;
        let highestBid = 0;
        let highestBidder = null;
        bids.forEach((bid) => {
          if (bid.bidAmount > highestBid) {
            highestBid = bid.bidAmount;
            highestBidder = bid.bidBy;
          }
        });
        product.boughtBy = highestBidder;
        await product.save();
      }
    });
    return res.status(200).json({ success: "Status updated successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default updateStatus;
