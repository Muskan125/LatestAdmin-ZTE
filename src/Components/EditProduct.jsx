import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const EditProduct = () => {
  const [productDetails, setProductDetails] = useState([]);
  const location = useLocation();
  const { specificationId } = location.state;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://97.74.92.218:7776/productsbyvertical/${specificationId}`
        );
        setProductDetails(response.data);
        console.log(response.data);
        console.log("id of product ", specificationId);
      } catch (error) {
        console.error("Error Fetching data: ", error);
      }
    };
    fetchProducts();
  }, [specificationId]);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        <table className="border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {productDetails.map((productDetail) => (
              <tr key={productDetail._id}>
                <td className="border border-gray-300 p-2">
                  {productDetail.productName}
                </td>
                <td className="border border-gray-300 p-2">
                  {productDetail.properties.category}
                </td>
                <td className="border border-gray-300 p-2">
                  {productDetail.type}
                </td>
                <td className="border border-gray-300 p-2 flex justify-center">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                    Add Variant
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EditProduct;
