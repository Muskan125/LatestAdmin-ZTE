import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Variant = () => {
  const [productName, setProductName] = useState("");
  const [properties, setProperties] = useState({});
  const [specification, setSpecification] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [group, setGroup] = useState({});
  const [images, setImages] = useState([]);
  const [type, setType] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const location = useLocation();
  const { productDetailID } = location.state;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://97.74.92.218:7776/model/${productDetailID}`
        );
        setSpecification(response.data.specification);
        setProperties(response.data.properties);
        setProductName(response.data.productName);
        setType(response.data.type);
        setGroup(response.data.groupId);
        setImages(response.data.photo);
      } catch (error) {
        console.error("Error Fetching data: ", error);
      }
    };
    fetchProducts();
  }, [productDetailID]);

  const handleInputChange = (key, value) => {
    setSpecification((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setSelectedImages(files);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("group", group);
      formData.append("productName", productName);
      formData.append("type", type);
      Object.entries(specification).forEach(([key, value]) => {
        formData.append(`specification.${key}`, JSON.stringify(value));
      });
      formData.append("properties.category", properties.category);
      formData.append("properties.subcategory", properties.subcategory);
      formData.append("properties.vertical", properties.vertical);
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("photo", selectedImages[i]);
      }

      await axios.post(
        `http://97.74.92.218:7776/addvariant/${group}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Data submitted successfully!");
      window.alert("Data Added successfully!");
    } catch (error) {
      console.error("Error submitting data: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-md">
          <label
            htmlFor="productName"
            className="block text-lg font-medium text-gray-700"
          >
            Product Name
          </label>
          <div className="mt-1 px-3 py-2 bg-gray-100 rounded-md">
            {productName}
          </div>
        </div>
        <div className="bg-white p-4 rounded-md">
          <label
            htmlFor="type"
            className="block text-lg font-medium text-gray-700"
          >
            Type
          </label>
          <div className="mt-1 px-3 py-2 bg-gray-100 rounded-md">{type}</div>
        </div>
        {Object.entries(specification).map(([key, value]) => (
          <div key={key} className="bg-white p-4 rounded-md">
            <label
              htmlFor={key}
              className="block text-lg font-medium text-gray-700"
            >
              {key}
            </label>
            {["ram", "rom", "colour"].includes(key) ? (
              <input
                type="text"
                id={key}
                name={`specification.${key}`}
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
              />
            ) : (
              <div className="mt-1 px-3 py-2 bg-gray-100 rounded-md">
                {value}
              </div>
            )}
          </div>
        ))}
        <div className="bg-white p-4 rounded-md">
          <label className="block text-lg font-medium text-gray-700">
            Properties
          </label>
          <div className="mt-1 px-3 py-2 bg-gray-100 rounded-md">
            {Object.entries(properties).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        </div>
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
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default Variant;
