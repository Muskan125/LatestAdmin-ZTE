import React, { useState } from "react";
import MainModel from "./MainModel";
import EnquiryHistory from "./EnquiryHistory";
import AddSubCat from "./AddSubCat";
import Categories from "../Pages/Categories";
import UploadBrand from "./UploadBrand";
import ViewProduct from "./ViewProduct";
import {useNavigate} from "react-router-dom"

const SideNav = () => {
  const [mainModel, setMainModel] = useState(true);
  const [enquiryData, setEnquiryData] = useState(false);
  const [subcat, setSubcat] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const [product, setProduct] = useState(false);
  const navigate = useNavigate();

  const showMainModel = () => {
    setMainModel(true);
    setEnquiryData(false);
    setSubcat(false);
    setBrand(false);
    setCategory(false);
    setProduct(false);
  };
  const showEnquiry = () => {
    setEnquiryData(true);
    setMainModel(false);
    setSubcat(false);
    setBrand(false);
    setCategory(false);
    setProduct(false);
  };
  const showSubCat = () => {
    setSubcat(true);
    setEnquiryData(false);
    setMainModel(false);
    setBrand(false);
    setCategory(false);
    setProduct(false);
  };
  const showCategory = () => {
    setCategory(true);
    setBrand(false);
    setSubcat(false);
    setEnquiryData(false);
    setMainModel(false);
    setProduct(false);
  };
  const uploadBrand = () => {
    setCategory(false);
    setBrand(true);
    setSubcat(false);
    setEnquiryData(false);
    setMainModel(false);
    setProduct(false);
  };
  const showProduct = () => {
    setProduct(true);
    setCategory(false);
    setBrand(false);
    setSubcat(false);
    setEnquiryData(false);
    setMainModel(false);
  };
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("tokenData");
    // Redirect to login page
    navigate("/");
  };
  return (
    <div className=" flex gap-5">
      <div className=" h-[100vh] w-80 bg-blue-500 text-white flex flex-col  justify-between">
      <div className="flex flex-col gap-2">
        <input
          type="button"
          value=" Add model"
          className=" bg-blue-600 p-3"
          onClick={showMainModel}
        />
        <input
          type="button"
          value=" Enquiry"
          className=" bg-blue-600 p-3"
          onClick={showEnquiry}
        />
        <input
          type="button"
          value="Upload Subcategory"
          className=" bg-blue-600 p-3"
          onClick={showSubCat}
        />
        <input
          type="button"
          value="show category"
          className=" bg-blue-600 p-3"
          onClick={showCategory}
        />
        <input
          type="button"
          value="upload brand"
          className=" bg-blue-600 p-3"
          onClick={uploadBrand}
        />
        <input
          type="button"
          value="show product"
          className=" bg-blue-600 p-3"
          onClick={showProduct}
        />
        </div>
      <div>
      <input
          type="button"
          value="Log Out"
          className=" bg-red-600 p-3"
          onClick={handleLogout}
          
        />
      </div>
      </div>
      <div>{mainModel ? <MainModel /> : <></>}</div>
      <div>{enquiryData ? <EnquiryHistory /> : <></>}</div>
      <div>{subcat ? <AddSubCat /> : <></>}</div>
      <div>{category ? <Categories /> : <></>}</div>
      <div>{brand ? <UploadBrand /> : <></>}</div>
      <div>{product ? <ViewProduct /> : <></>}</div>
    </div>
  );
};

export default SideNav;
