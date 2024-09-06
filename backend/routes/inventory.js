import express from "express";
import { data } from "../data/data.js";

const router = express.Router();

router.get("/search",  (req, res) => {
  const { itemName, serialNumber, skuCode, itemType, quantity } = req.query;

  const results = data.filter((item) => {
    return (
      (!itemName ||
        item.itemName?.toLowerCase().includes(itemName.toLowerCase())) &&
      (!quantity || item.quantity.toString() === quantity) &&
      (!serialNumber || item.serialNumber === serialNumber) &&
      (!skuCode ||
        item.skuCode?.toLowerCase().includes(skuCode.toLowerCase())) &&
      (!itemType ||
        item.itemType?.toLowerCase().includes(itemType.toLowerCase()))
    );
  });

  res.json(results);
});

export default router;
