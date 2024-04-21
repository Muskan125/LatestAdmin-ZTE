import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Pages/Login";
import EnquiryHistory from "./Pages/EnquiryHistory";
import AdminDashboard from "./Pages/AdminDashboard";
import UploadBrand from "./Components/UploadBrand";
import AddSubCat from "./Components/AddSubCat";
import Categories from "./Pages/Categories";
import EditProduct from "./Components/EditProduct";
import ViewProduct from "./Components/ViewProduct";
import EditSpecification from "./Components/EditSpecification";
import Formm from "./Components/Formm";
import Users from "./Pages/Users";
import FetchSpecifications from "./Components/FetchSpecifications";
import MainModel from "./Components/MainModel";
import Variant from "./Components/Variant";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/EnquiryHistory" element={<EnquiryHistory />} />
        <Route path="/UploadBrand" element={<UploadBrand />} />
        <Route path="/UploadSubCategory" element={<AddSubCat />} />

        <Route path="/EditProduct" element={<EditProduct />} />
        <Route path="/Formm" element={<Formm />} />
        <Route path="/FetchSpecifications" element={<FetchSpecifications />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/ViewProduct" element={<ViewProduct />} />
        <Route path="/EditSpecification" element={<EditSpecification />} />
        <Route path="/AddSubCat" element={<AddSubCat />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/MainModel" element={<MainModel />} />
        <Route path="/Variant" element={<Variant />} />
      </Routes>
    </Layout>
  );
};

export default App;
