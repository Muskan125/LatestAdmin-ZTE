import axios from "axios";
import React, { useState, useEffect } from "react";
const EditSpecification = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [specification, setSpecification] = useState([]);

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
        {specification.map((spec) => (
          <div key={spec._id}>{spec.name}</div>
        ))}
      </div>
    </div>
  );
};

export default EditSpecification;
