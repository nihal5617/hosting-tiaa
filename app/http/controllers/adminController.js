import Product from "../../models/product.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const adminController = () => {
    return {
        async getProuctsWithHighestBidInsortedOrder(req, res) {
            try {
                // get products which are ended
                const products = await Product.find({ auctionStatus: "Completed" });
                const sortedProducts = products.sort((a, b) => {
                    return b.finalPrice - a.finalPrice;
                });
                return res.status(200).json({ sortedProducts });
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        }
    }
}

export default adminController;