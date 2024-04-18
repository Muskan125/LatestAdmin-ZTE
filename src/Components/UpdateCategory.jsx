import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editedCategoryName, setEditedCategoryName] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://97.74.92.218:7776/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error Fetching data: ", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryUpdate = async (categoryId, newName) => {
    try {
      if (!newName) {
        return window.alert("Please fill all the information");
      }

      const formData = new FormData();
      formData.append("name", newName);

      await axios.post(
        `http://97.74.92.218:7776/category/${categoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      window.alert("Category updated successfully");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleCategoryDelete = async (categoryId) => {
    try {
      await axios.delete(`http://97.74.92.218:7776/category/${categoryId}`);

      // Update the local state to remove the deleted category
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat._id !== categoryId)
      );

      window.alert("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleSubmit = async (categoryId) => {
    try {
      const newName = editedCategoryName[categoryId];
      if (!newName) {
        return window.alert("Please fill all the information");
      }

      await handleCategoryUpdate(categoryId, newName);

      window.alert("Category updated successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h4 className="text-lg font-semibold mb-2">Update Categories</h4>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Category ID</th>
            <th className="px-4 py-2">Category Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td className="border px-4 py-2">{cat._id}</td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={editedCategoryName[cat._id] || cat.categoryName}
                  onChange={(e) => {
                    setEditedCategoryName((prevNames) => ({
                      ...prevNames,
                      [cat._id]: e.target.value,
                    }));
                  }}
                  className="border rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleSubmit(cat._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
                <button
                  onClick={() => handleCategoryDelete(cat._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateCategory;
