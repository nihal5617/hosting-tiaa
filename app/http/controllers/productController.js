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
      let currentDate = new Date();
      currentDate = currentDate.toISOString().split("T")[0];
      let auctionStatus = "Upcoming";
      console.log(startDate, endDate, currentDate);
      if (startDate < currentDate && endDate > currentDate) {
        auctionStatus = "Live";
      } else if (endDate < currentDate) {
        auctionStatus = "Completed";
      }
      console.log("outside", auctionStatus);

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
        if (product.type === "Construction") {
          product.bids.sort((a, b) => a.bidAmount - b.bidAmount);
        } else {
          product.bids.sort((a, b) => b.bidAmount - a.bidAmount);
        }
        return res.status(200).json({ product });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },

    async getAllTypesCount(req, res) {
      // each product has a type from the following list
      // ["Electronics", "Vehicles", "Real estate", "Art piece", "Jewelry"]
      try {
        const electronicsCount = await Product.countDocuments({
          type: "Electronics",
        });
        const vehiclesCount = await Product.countDocuments({
          type: "Vehicles",
        });
        const realEstateCount = await Product.countDocuments({
          type: "Real estate",
        });
        const artPieceCount = await Product.countDocuments({
          type: "Art piece",
        });
        const jewelryCount = await Product.countDocuments({
          type: "Jewelry",
        });
        const constructionCount = await Product.countDocuments({
          type: "Construction",
        });
        const output = [
          { name: "Electronics", number_of_products: electronicsCount },
          { name: "Vehicles", number_of_products: vehiclesCount },
          { name: "Real estate", number_of_products: realEstateCount },
          { name: "Art piece", number_of_products: artPieceCount },
          { name: "Jewelry", number_of_products: jewelryCount },
          { name: "Construction", number_of_products: constructionCount },
        ];
        return res.status(200).json({ output });
      } catch (error) {
        return res.status(500).json("error");
      }
    },
  };
};

export default projectController;
