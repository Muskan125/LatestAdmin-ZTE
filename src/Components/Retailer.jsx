import React, { useState, useEffect } from "react";
import axios from "axios";

const Retailer = () => {
  const [retailers, setRetailers] = useState([]);
  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const response = await axios.get("http://97.74.92.218:7776/users");

        const retailerData = response.data.filter((users) => users.role === 2);
        setRetailers(retailerData);
      } catch (error) {
        console.error("Error Fetching retailers: ", error);
      }
    };
    fetchRetailers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Retailer Details</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Shop
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Joining Date
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {retailers.map((retailer, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {retailer.name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {retailer.mobile}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {retailer.date}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button
                  type="button"
                  className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                >
                  View Enquiries
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Retailer;
