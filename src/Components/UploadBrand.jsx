import React, { useState } from "react";
import axios from "axios";


const UploadBrand = () => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      if (!name) {
        return window.alert("Please fill all the information");
      }

      const formData = new FormData();
      formData.append("name", name);

      await axios.post("https://onestore-vert.vercel.app/brand", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      window.alert("Data added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container flex justify-start align-start">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="mt-3">
            <h5 className="text-lg font-semibold">Brand Name</h5>
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Upload Brand
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadBrand;
