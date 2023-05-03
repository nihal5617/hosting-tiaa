import { cloudinaryUploadImage } from "../../middleware/cloudinary.js";
import Product from "../../models/product.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const projectController = () => {
  return {
    async createProduct(req, res) {
      let { seller } = req.body;
      if (!req.file) {
        return res.status(400).send({
          message: "Article image can not be empty",
        });
      }
      const localPath = `uploads/${req.file.filename}`;
      const uploadedImg = await cloudinaryUploadImage(localPath);
      console.log(uploadedImg);
      const {
        name,
        description,
        type,
        startPrice,
        endDate,
        startDate,
        auctionType,
      } = req.body;
      seller = new ObjectId(seller);
      const currentDate = new Date();
      let auctionStatus = "Upcoming";
      if (startDate < currentDate && endDate > currentDate) {
        auctionStatus = "Live";
      } else if (endDate < currentDate) {
        auctionStatus = "Completed";
      }

      try {
        const product = new Product({
          name,
          image: uploadedImg.url,
          description,
          seller,
          type,
          startPrice,
          startDate,
          endDate,
          auctionType,
          auctionStatus,
        });
        await product.save();
        return res.status(201).json({ success: "Project added successfully!" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
    async getProducts(req, res) {
      try {
        const products = await Product.find();
        return res.status(200).json({ products });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },

    async getProduct(req, res) {
      const { productId } = req.params;
      try {
        const product = await Product.findById(productId).populate("bids");
        return res.status(200).json({ product });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
  };
};

export default projectController;