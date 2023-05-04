import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["Electronics", "Vehicles", "Real estate", "Art piece", "Jewelry"],
      default: "Electronics",
      required: true,
    },
    startPrice: {
      type: Number,
      required: true,
    },
    finalPrice : {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    auctionType: {
      type: String,
      enum: ["Normal", "Event"],
      default: "Normal",
      required: true,
    },
    auctionStatus: {
      type: String,
      enum: ["Upcoming", "Live", "Completed"],
      default: "Upcoming",
      required: true,
    },
    boughtBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
