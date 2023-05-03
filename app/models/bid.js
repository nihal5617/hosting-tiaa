import mongoose from "mongoose";

const bidSchema = mongoose.Schema(
  {
    bidAmount: {
      type: Number,
      required: true,
    },
    bidBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bidOn: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Bid", bidSchema);
