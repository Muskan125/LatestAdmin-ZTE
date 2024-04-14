import { Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import EnquiryHistory from "./Components/EnquiryHistory";
import AdminDashboard from "./Pages/AdminDashboard";
import UploadBrand from "./Components/UploadBrand";
import AddSubCat from "./Components/AddSubCat";
import Categories from "./Pages/Categories";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/EnquiryHistory" element={<EnquiryHistory />} />
        <Route path="/UploadBrand" element={<UploadBrand/>}/>
        <Route path="/UploadSubCategory" element={<AddSubCat/>}/>
        <Route path="/UploadCategory" element={<Categories/>}/>
      </Routes>
    </>
  );
};

export default App;
