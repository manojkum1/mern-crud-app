import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddItemForm = () => {
  const [newItem, setNewItem] = useState({
    serialNumber: "",
    itemName: "",
    quantity: "",
    skuCode: "",
    itemType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/inventory/add",
        newItem
      );
      if (response.data.success) {
        toast.success("Item added successfully");
        setNewItem({
          serialNumber: "",
          itemName: "",
          quantity: "",
          skuCode: "",
          itemType: "",
        }); // Clear form
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md mx-auto mt-10">
      <h2 className="text-center text-white text-2xl font-bold mb-4">
        Add New Item
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="serialNumber"
            className="text-sm font-medium text-gray-300 block"
          >
            Serial Number
          </label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            value={newItem.serialNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="itemName"
            className="text-sm font-medium text-gray-300 block"
          >
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={newItem.itemName}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="text-sm font-medium text-gray-300 block"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newItem.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="skuCode"
            className="text-sm font-medium text-gray-300 block"
          >
            SKU Code
          </label>
          <input
            type="text"
            id="skuCode"
            name="skuCode"
            value={newItem.skuCode}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="itemType"
            className="text-sm font-medium text-gray-300 block"
          >
            Item Type
          </label>
          <input
            type="text"
            id="itemType"
            name="itemType"
            value={newItem.itemType}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-red-600 text-white font-semibold rounded-md"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
