import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MainModel = () => {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState([]);
  const [selectedProductType, setSelectedProdType] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [description, setDescription] = useState("");
  const [Specification, setSpecification] = useState("");
  const [Pimg, setPimg] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPimg([...Pimg, ...files]);
  };

  const SubmitAllData = async () => {
    try {
      if (
        !productName ||
        !selectedCat ||
        !selectedSubCat ||
        !selectedBrand ||
        !selectedProductType ||
        !description ||
        !Specification ||
        !Pimg.length
      ) {
        return window.alert("Please fill all the information");
      }
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("category", selectedCat);
      formData.append("subcategory", selectedSubCat);
      formData.append("brand", selectedBrand);
      formData.append("type", selectedProductType);
      formData.append("description", description);
      formData.append("specification", Specification);

      console.log("Before map, images:", Pimg);

      // Append images to formData using map
      const imageFiles = Pimg.map((image) => {
        formData.append("Categpry Images", image);
        return image;
      });
      await axios.post("http://97.74.92.218:7776/addmodel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      window.alert("Data added successfully");
      setSelectedBrand("");
      setProductName("");
      setSelectedCat("");
      setSelectedSubCat("");
      setSelectedProdType("");
      setPimg([]);
      setDescription("");
      setSpecification("");

      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        if (selectedCat) {
          const response = await axios.get(
            `http://97.74.92.218:7776/selectedsubcategory/${selectedCat}`
          );
          setSubCategories(response.data);
        }
      } catch (error) {
        console.error("Error Fetching data: ", error);
      }
    };
    fetchSubCategories();
  }, [selectedCat]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://97.74.92.218:7776/brands");
        setBrands(response.data);
      } catch (error) {
        console.error("Error Fetching data: ", error);
      }
    };
    fetchBrands();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <select
              className="border rounded p-2 w-full"
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
          <div>
            <select
              className="border rounded p-2 w-full"
              value={selectedProductType}
              onChange={(e) => setSelectedProdType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="smartphone">Smartphone</option>
              <option value="laptop">Laptop</option>
              <option value="tablet">Tablet</option>
            </select>
          </div>
          <div>
            <select
              className="border rounded p-2 w-full"
              value={selectedSubCat}
              onChange={(e) => setSelectedSubCat(e.target.value)}
            >
              <option value="">Select Subcategory</option>
              {subCategories.map((subcat) => (
                <option key={subcat._id} value={subcat._id}>
                  {subcat.subCategoryName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="border rounded p-2 w-full"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">Select Brands</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h5>Enter Product</h5>
            <input
              type="text"
              className="border rounded p-2 w-full"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <h5>Enter Description</h5>
            <input
              type="text"
              className="border rounded p-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <h5>Enter Specification</h5>
            <input
              type="text"
              className="border rounded p-2 w-full"
              value={Specification}
              onChange={(e) => setSpecification(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div>
            <h5>Upload Category Images</h5>
            <input
              type="file"
              className="border rounded p-2 w-full"
              accept="image/jpeg, image/png"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <div>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={SubmitAllData}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainModel;
