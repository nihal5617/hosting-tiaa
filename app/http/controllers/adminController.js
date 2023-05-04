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
        },
        async getProductsWithMaxBids(req, res) {
            try {
                const products = await Product.find();
                // if bids are empty remove that product
                // products.forEach((product) => {
                //     if (product.bids.length === 0) {
                //         product.remove();
                //     }
                // });
                const sortedProducts = products.sort((a, b) => {
                    return b.bids.length - a.bids.length;
                });
                return res.status(200).json({ sortedProducts });
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },
        async getQuickestRecurringBidsProducts(req, res) {
            try {
                const products = await Product.find();
                // products.forEach((product) => {
                //     if (product.bids.length === 0) {
                //         product.remove();
                //     }
                // });
                const sortedProducts = products.sort((a, b) => {
                    return b.bids.length - a.bids.length;
                });
                return res.status(200).json({ sortedProducts });
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },
    }
}

export default adminController;