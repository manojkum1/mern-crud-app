import mongoose from "mongoose";

const inventoryItem = new mongoose.Schema(
  {
    serial_number: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sku_code: {
      type: Number,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Item = mongoose.model("Item", inventoryItem);
