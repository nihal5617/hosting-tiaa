import User from "../../models/user.js";
import Product from "../../models/product.js";
import Bid from "../../models/bid.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const userController = () => {
  return {
    async login(req, res) {
      const { email, password } = req.body;

      try {
        const salt = await bcrypt.genSalt(10); // comment
        const hashPassword = await bcrypt.hash(password, salt); // comment

        const user = await User.findOne({ email });
        if (!user)
          return res.status(404).json({ error: "User does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(300).json({ message: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "12h",
        });
        delete user.password;

        return res.status(200).json({ token, user });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
    async register(req, res) {
      const { name, email, password, phoneNumber, pancard, metamask } =
        req.body;
      try {
        const salt = await bcrypt.genSalt(10); // comment
        const hashPassword = await bcrypt.hash(password, salt); // comment
        const user = await User.create({
          name,
          email,
          password: hashPassword,
          phoneNumber,
          pancard,
          metamask,
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "12h",
        });
        delete user.password;
        return res.status(200).json({ token, user });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
    async getUserProducts(req, res) {
      const { userId } = req.params;
      try {
        const products = await Product.find({ seller: userId });
        return res.status(200).json({ products });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
    async getBoughtProducts(req, res) {
      const { userId } = req.params;
      try {
        const products = await Product.find({ boughtBy: userId });
        return res.status(200).json({ products });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
    async getBidedProducts(req, res) {
      // get bids and then populate product
      const { userId } = req.params;
      try {
        const bids = await Bid.find({ bidBy: userId }).populate("bidOn");
        return res.status(200).json({ bids });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
  };
};

export default userController;