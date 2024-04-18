import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchSpecifications = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [productName, setProductName] = useState(""); // State to store product name
  const [specification, setSpecification] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://onestore-vert.vercel.app/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error Fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchSpecificationsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://onestore-vert.vercel.app/specification/${categoryId}`
      );
      setSpecification(response.data);
    } catch (error) {
      console.error("Error Fetching specifications: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCat) {
      fetchSpecificationsByCategory(selectedCat);
    }
  }, [selectedCat]);

  useEffect(() => {
    console.log("data set successfully :", specification); // Log the updated state when it changes
  }, [specification]);

  // Function to render input based on property type
  const renderInput = (type, name) => {
    switch (type) {
      case "String":
        return (
          <input
            type="text"
            className="border rounded p-2"
            name={name}
            onChange={(e) => handleInputChange(e, name)}
          />
        );
      case "Boolean":
        return (
          <input
            type="checkbox"
            className="border rounded p-2"
            name={name}
            onChange={(e) => handleInputChange(e, name)}
          />
        );
      case "Number":
        return (
          <input
            type="number"
            className="border rounded p-2"
            name={name}
            onChange={(e) => handleInputChange(e, name)}
          />
        );
      default:
        return (
          <input
            type="text"
            className="border rounded p-2"
            name={name}
            onChange={(e) => handleInputChange(e, name)}
          />
        );
    }
  };

  // Function to handle form input change
  const handleInputChange = (event, name) => {
    const { value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const [formData, setFormData] = useState({});

  // Function to handle form submission
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create a new FormData object
      const formDataToSend = new FormData();

      // Append product name and category ID
      formDataToSend.append("productName", productName);
      formDataToSend.append("properties.category", selectedCat);

      // Append specifications
      specification.forEach((spec) => {
        // Append specification ID
        formDataToSend.append("properties.vertical", spec._id);
        formDataToSend.append("type", spec.name);

        // Append specification details
        Object.entries(spec.specification).forEach(([key, value]) => {
          const inputValue = formData[key];
          formDataToSend.append(`specification.${key}`, inputValue);
        });
      });

      // Send data to the backend
      const response = await axios.post(
        "https://onestore-vert.vercel.app/addproduct",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Select a category:</h2>
      <select
        value={selectedCat}
        onChange={(e) => setSelectedCat(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.categoryName}
          </option>
        ))}
      </select>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Enter Product Name: </h2>
        <input
          type="text"
          className="border rounded p-2"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Specifications:</h3>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border ">Property</th>
                <th className="px-4 py-2 border">Value</th>
              </tr>
            </thead>
            <tbody>
              {specification.map((spec) => (
                <React.Fragment key={spec._id}>
                  <tr>
                    <td
                      colSpan="2"
                      className="text-lg font-bold border px-4 py-2"
                    >
                      {spec.name}
                    </td>
                  </tr>
                  {Object.entries(spec.specification).map(([key, value]) => (
                    <tr key={key}>
                      <td className="border px-4 py-2">
                        <strong>{key}</strong>
                      </td>
                      <td className="border px-4 py-2">
                        {renderInput(value.type, key)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FetchSpecifications;
