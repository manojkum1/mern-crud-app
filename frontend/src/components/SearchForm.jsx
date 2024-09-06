import React, { useState } from "react";
import axios from "axios";

const SearchForm = () => {
  const [query, setQuery] = useState({
    itemName: "",
    serialNumber: "",
    skuCode: "",
    itemType: "",
    quantity: "",
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const searchItems = async () => {
    try {
      const hasQuery = Object.values(query).some((q) => q.trim() !== "");
      if (!hasQuery) {
        setResults([]);
        return;
      }

      const response = await axios.get("http://localhost:5000/inventory/search", {
        params: {
          itemName: query.itemName.trim(),
          serialNumber: query.serialNumber.trim(),
          skuCode: query.skuCode.trim(),
          itemType: query.itemType.trim(),
          quantity: query.quantity.trim(),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setResults(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching data. Please try again.");
      console.error("Error fetching data:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
      {/* Search Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <input
          type="text"
          name="itemName"
          value={query.itemName}
          onChange={handleChange}
          placeholder="Search items by name..."
          className="text-gray-700 font-semibold py-2 px-4 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="serialNumber"
          value={query.serialNumber}
          onChange={handleChange}
          placeholder="Search by serial number..."
          className="text-gray-700 font-semibold py-2 px-4 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="skuCode"
          value={query.skuCode}
          onChange={handleChange}
          placeholder="Search by SKU code..."
          className="text-gray-700 font-semibold py-2 px-4 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="itemType"
          value={query.itemType}
          onChange={handleChange}
          placeholder="Search by item type..."
          className="text-gray-700 font-semibold py-2 px-4 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="quantity"
          value={query.quantity}
          onChange={handleChange}
          placeholder="Search by quantity..."
          className="text-gray-700 font-semibold py-2 px-4 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={searchItems}
        className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      >
        Search
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Results Table */}
      <div className="overflow-x-auto mt-6 w-full">
        {results.length > 0 ? (
          <table className="min-w-full bg-white rounded-lg shadow-md ">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Serial Number</th>
                <th className="py-2 px-4 text-left">Item Name</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">SKU Code</th>
                <th className="py-2 px-4 text-left">Item Type</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item) => (
                <tr key={item.serialNumber} className="border-b ">
                  <td className="py-2 px-4">{item.serialNumber}</td>
                  <td className="py-2 px-4">{item.itemName}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">{item.skuCode}</td>
                  <td className="py-2 px-4">{item.itemType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 text-gray-700">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
