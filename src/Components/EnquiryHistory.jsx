import React, { useState, useEffect } from "react";
import axios from "axios";

const EnquiryHistory = () => {
  const [enquiry, setEnquiry] = useState([]);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        //     const token = localStorage.getItem('tokenData');
        // if (token) {
        //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // }
        // console.log(token);

        const response = await axios.get("http://97.74.92.218:7776/inquiries");
        setEnquiry(response.data);
        console.log("Enquiry History :", response.data); // Use response.data instead of enquiry
      } catch (error) {
        console.error("Error Fetching data: ", error);
      }
    };

    fetchEnquiry();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-4">Enquiry History</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Date Time</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Shop Name</th>
              <th className="px-4 py-2">Shop Number</th>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Customer Number</th>
            </tr>
          </thead>
          <tbody>
            {enquiry.map((enquiryItem) => (
              <tr key={enquiryItem._id}>
                <td className="border px-4 py-2">{enquiryItem.date}</td>
                <td className="border px-4 py-2">
                  {enquiryItem.product.productName}
                </td>
                <td className="border px-4 py-2">
                  {enquiryItem.shop.shopName}
                </td>
                <td className="border px-4 py-2">
                  {enquiryItem.shop.shopNumber}
                </td>
                <td className="border px-4 py-2">
                  {enquiryItem.customer.customerName}
                </td>
                <td className="border px-4 py-2">
                  {enquiryItem.customer.customerNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EnquiryHistory;
