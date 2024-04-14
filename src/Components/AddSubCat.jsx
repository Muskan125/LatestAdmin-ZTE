import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSubCat = () => {
  // For Fetching Category......!!!!!
  const [categories, setCategories] = useState([]);
  const [subcat, setSubcat] = useState("");
  const [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://onestore-vert.vercel.app/categories"
        );
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error Fetching data: ", error);
      }
    };
    fetchCategories();
  }, []);

  // Uploading Category.....!!!!!!!
  const SubmitSubCat = async () => {
    try {
      if (!subcat || !selectedCat) {
        return window.alert("Please fill all the information");
      }

      const formData = new FormData();
      formData.append("name", subcat);
      formData.append("category", selectedCat);

      await axios.post(
        "https://onestore-vert.vercel.app/sub_category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      window.alert("Data added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="mb-3">
            <h5>Enter SubCategory</h5>
            <input
              type="text"
              className="form-control"
              value={subcat}
              onChange={(e) => setSubcat(e.target.value)}
            />
          </div>
          <div>
            <input
              type="button"
              value="Upload"
              className="btn btn-primary"
              onClick={SubmitSubCat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubCat;
