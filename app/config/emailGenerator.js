import nodemailer from "nodemailer";
import Product from "../models/product.js";
import User from "../models/user.js";

const emailGenerator = async () => {
  const products = await Product.find({ endDate: new Date() });

  products.forEach(async (product) => {
    const highestBidderId = product.bids[product.bids.length - 1].bidder;
    const highestBidder = await User.findById(highestBidderId);
    console.log(highestBidder);
    const highestBidderEmail = highestBidder.email;
    const highestBidderName = highestBidder.name;

    // send an email to the highest bidder
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: highestBidderEmail,
      subject: "Auction has ended",
      text: `Hello ${highestBidderName}, the auction for ${product.name} has ended. You are receiving this email because you are the highest bidder and you have to pay the price to upiId nihalng786@okicic.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    const sellerId = product.seller;

    const seller = await User.findById(sellerId);

    // send an email to the seller
    const sellerEmail = seller.email;
    const sellerName = seller.name;

    const mailOptions2 = {
      from: process.env.EMAIL,
      to: sellerEmail,
      subject: "Auction has ended",
      text: `Hello ${sellerName}, the auction for ${product.name} has ended.`,
    };

    transporter.sendMail(mailOptions2, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
};

export default emailGenerator;
