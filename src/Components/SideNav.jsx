import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("tokenData");
    navigate("/");
  };

  return (
    <div className="flex gap-5 h-screen">
      <div className="h-screen w-25 bg-blue-500 text-white flex flex-col justify-between">
        <ul className="flex flex-col gap-2 p-4">
          <li>
            {" "}
            <Link to="/MainModel">
              <button className="bg-blue-600 p-3 rounded w-full">
                Add Model
              </button>
            </Link>
          </li>
          <li>
            <Link to="/EnquiryHistory">
              <button className="bg-blue-600 p-3 rounded w-full">
                Enquiry
              </button>
            </Link>
          </li>
          <li>
            <Link to="/AddSubCat">
              <button className="bg-blue-600 p-3 rounded w-full">
                Upload Subcategory
              </button>
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/Categories">
              <button className="bg-blue-600 p-3 rounded w-full">
                Show Category
              </button>
            </Link>
          </li>
          <li>
            <Link to="/UploadBrand">
              <button className="bg-blue-600 p-3 rounded w-full">
                Upload Brand
              </button>
            </Link>
          </li>
          <li>
            <Link to="/ViewProduct">
              <button className="bg-blue-600 p-3 rounded w-full">
                Show Product
              </button>
            </Link>
          </li>
          <li>
            <Link to="/Formm">
              <button className="bg-blue-600 p-3 rounded w-full">
                Show Form
              </button>
            </Link>
          </li>
          <li>
            <Link to="/FetchSpecifications">
              <button className="bg-blue-600 p-3 rounded w-full">
                Get Specifications
              </button>
            </Link>
          </li>
          <li>
            <Link to="/Users">
              <button className="bg-blue-600 p-3 rounded w-full">
                Show Users
              </button>
            </Link>
          </li>
          <li>
            <Link to="/EditSpecification">
              {" "}
              <button className="bg-blue-600 p-3 rounded w-full">
                Edit Specification
              </button>
            </Link>
          </li>
        </ul>
        <div className="p-4">
          <button
            className="bg-red-600 p-3 rounded w-full"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
