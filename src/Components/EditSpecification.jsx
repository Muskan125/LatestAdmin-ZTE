import axios from "axios";
import React, { useState, useEffect } from "react";
import Formm from "./Formm"; // Import your Form component
import EditProduct from "./EditProduct";
import { useNavigate } from "react-router-dom";

const EditSpecification = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [specifications, setSpecifications] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedSpecification, setSelectedSpecification] = useState(null); // State to hold the selected specification
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
  const navigate = useNavigate();

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
      setSpecifications(response.data);
    } catch (error) {
      console.error("Error Fetching specifications: ", error);
    }
  };

  useEffect(() => {
    if (selectedCat) {
      fetchSpecificationsByCategory(selectedCat);
      const selectedCategory = categories.find(
        (cat) => cat._id === selectedCat
      );
      setSelectedCategoryName(
        selectedCategory ? selectedCategory.categoryName : ""
      );
    }
  }, [selectedCat, categories]);

  // Function to handle "Update" button click
  const handleUpdateClick = async (specId) => {
    try {
      const response = await axios.get(
        `http://97.74.92.218:7776/add-specifications/${specId}`
      );
      setSelectedSpecification(response.data);
      setShowForm(true); // Show the form when data is fetched
    } catch (error) {
      console.error("Error Fetching specification details: ", error);
    }
  };
  const handleViewProduct = (specificationId) => {
    navigate("/EditProduct", {
      state: { specificationId },
    });
  };

  return (
    <div>
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

      <div>
        <h3 className="text-lg font-bold mb-2">
          List of {selectedCategoryName}:
        </h3>
        <table className="border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Specification Name</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {specifications.map((spec) => (
              <tr key={spec._id}>
                <td className="border border-gray-300 p-2">{spec.name}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
                    onClick={() => handleUpdateClick(spec._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleViewProduct(spec._id)}
                  >
                    View Product
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && selectedSpecification && (
        <div>
          <h3 className="text-lg font-bold mb-2">Update Specification:</h3>
          <Formm
            onUpdate={() => {
              setShowForm(false); // Hide the form after updating
              // Optionally, you can refetch the specifications list here
            }}
            initialValues={selectedSpecification} // Pass fetched data to the form
          />
        </div>
      )}
    </div>
  );
};

export default EditSpecification;
