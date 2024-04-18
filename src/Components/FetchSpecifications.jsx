import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchSpecifications = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [productName, setProductName] = useState("");
  const [specification, setSpecification] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://97.74.92.218:7776/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error Fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchSpecificationsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://97.74.92.218:7776/specification/${categoryId}`
      );
      setSpecification(response.data);
    } catch (error) {
      console.error("Error Fetching specifications: ", error);
    }
  };

  useEffect(() => {
    if (selectedCat) {
      fetchSpecificationsByCategory(selectedCat);
    }
  }, [selectedCat]);

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setSelectedImages(files);
  };

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

  const handleInputChange = (event, name) => {
    const { value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const [formData, setFormData] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("productName", productName);
      formDataToSend.append("properties.category", selectedCat);
      for (let i = 0; i < selectedImages.length; i++) {
        formDataToSend.append("photo", selectedImages[i]);
      }

      specification.forEach((spec) => {
        formDataToSend.append("properties.vertical", spec._id);
        formDataToSend.append("type", spec.name);

        Object.entries(spec.specification).forEach(([key, value]) => {
          const inputValue = formData[key];
          formDataToSend.append(`specification.${key}`, inputValue);
        });
      });

      const response = await axios.post(
        "http://97.74.92.218:7776/addproduct",
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
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Select Images: </h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
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
