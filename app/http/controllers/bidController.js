import Product from "../../models/product.js";
import Bid from "../../models/bid.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const bidController = () => {
  return {
    async createBid(req, res) {
      let { bidBy, bidOn } = req.body;
      const { bidAmount } = req.body;
      bidBy = new ObjectId(bidBy);
      bidOn = new ObjectId(bidOn);
      try {
        const bid = new Bid({
          bidAmount,
          bidBy,
          bidOn,
        });
        await bid.save();
        await Product.findByIdAndUpdate(bidOn, {
          $push: { bids: bid._id },
        },{
            new: true,
        });
        return res.status(201).json({ success: "Bid added successfully!" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
  };
};

export default bidController;
