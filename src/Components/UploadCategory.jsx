import React, { useState } from "react";
import axios from "axios";

const UploadCategory = () => {
  const [cat_name, setCatName] = useState("");
  const [Catimg, setCatimg] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setCatimg([...Catimg, ...files]);
  };

  const handleSubmit = async () => {
    try {
      console.log("Categories Images:", Catimg);
      if (!cat_name || !Catimg.length) {
        return window.alert("Please fill all the information");
      }

      const formData = new FormData();
      formData.append("name", cat_name);

      console.log("Before map, images:", Catimg);

      // Append images to formData using map
      const imageFiles = Catimg.map((image) => {
        formData.append("Categpry Images", image);
        return image;
      });

      await axios.post("https://onestore-vert.vercel.app/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      window.alert("Category added successfully");
      setCatName(""); // Clear input field after successful submission
      setCatimg([]);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-lg font-semibold">Enter Category Name</h5>
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              value={cat_name}
              onChange={(e) => setCatName(e.target.value)}
            />
          </div>
          <div>
            <h5 className="text-lg font-semibold">Upload Category Images</h5>
            <input
              type="file"
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              accept="image/jpeg, image/png"
              multiple
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadCategory;
