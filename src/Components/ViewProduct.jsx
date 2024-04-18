import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewProduct = () => {
  const [brands, setBrands] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://97.74.92.218:7776/brands");
        setBrands(response.data);
      } catch (error) {
        console.error("Error Fetching brands data: ", error);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          "http://97.74.92.218:7776/selectedsubcategory/"
        );
        setSubCategories(response.data);
      } catch (error) {
        console.error("Error Fetching subcategories data: ", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://97.74.92.218:7776/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error Fetching categories data: ", error);
      }
    };

    fetchBrands();
    fetchSubCategories();
    fetchCategories();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div>
          <h2 className="text-2xl font-semibold">Product Details</h2>
        </div>
        <div className="mt-8">
          <h4 className="text-lg font-semibold">Categories</h4>
          <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">Category ID</th>
                <th scope="col">Category Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat._id}</td>
                  <td>{cat.categoryName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold">Subcategories</h4>
          <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">Subcategory ID</th>
                <th scope="col">Subcategory Name</th>
              </tr>
            </thead>
            <tbody>
              {subCategories.map((subcat) => (
                <tr key={subcat._id}>
                  <td>{subcat._id}</td>
                  <td>{subcat.subCategoryName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold">Brands</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <div key={brand._id} className="border rounded p-4">
                <h5 className="text-lg font-semibold">{brand.brandName}</h5>
                {brand.brandImage ? (
                  <img
                    src={`http://97.74.92.218:7776/${brand.brandImage}`}
                    alt={`Brand ${brand.brandName} image`}
                    className="mt-2 w-full h-36 object-cover"
                  />
                ) : (
                  <div className="text-gray-500 mt-2">No image found</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
