import React, { useState, useEffect } from "react";
import axios from "axios";

const EnquiryHistory = () => {
  const [enquiry, setEnquiry] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const response = await axios.get("http://97.74.92.218:7776/inquiries");
        setEnquiry(response.data);
        console.log("Enquiry History :", response.data); // Use response.data instead of enquiry
      } catch (error) {
        console.error("Error Fetching data: ", error);
      }
    };

    fetchEnquiry();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-US", { timeZone: "UTC" });
    return formattedDate;
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setSelectedMonth(null); // Reset selected month when year changes
    setSelectedDate(null); // Reset selected date when year changes
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setSelectedDate(null); // Reset selected date when month changes
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedYear(null); // Reset selected year when date is entered
    setSelectedMonth(null); // Reset selected month when date is entered
  };

  let filteredEnquiry = enquiry;

  if (selectedYear) {
    filteredEnquiry = filteredEnquiry.filter((item) =>
      item.date.startsWith(selectedYear)
    );
  }

  if (selectedMonth) {
    const [year, month] = selectedMonth.split("-");
    filteredEnquiry = filteredEnquiry.filter((item) =>
      item.date.startsWith(`${year}-${month}`)
    );
  }

  if (selectedDate) {
    filteredEnquiry = filteredEnquiry.filter((item) =>
      item.date.startsWith(selectedDate)
    );
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnquiry.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Enquiry History</h2>
      <div className="mb-4">
        <label htmlFor="yearPicker" className="mr-2">
          Select Year:
        </label>
        <input
          type="number"
          id="yearPicker"
          onChange={handleYearChange}
          value={selectedYear || ""}
          className="border border-gray-300 rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="monthPicker" className="mr-2">
          Select Month:
        </label>
        <input
          type="month"
          id="monthPicker"
          onChange={handleMonthChange}
          value={selectedMonth || ""}
          className="border border-gray-300 rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="datePicker" className="mr-2">
          Select Date:
        </label>
        <input
          type="date"
          id="datePicker"
          onChange={handleDateChange}
          value={selectedDate || ""}
          className="border border-gray-300 rounded p-2"
        />
      </div>

      {/* Table for displaying data */}
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
          {currentItems.map((enquiryItem) => (
            <tr key={enquiryItem._id}>
              <td className="border px-4 py-2">
                {formatDate(enquiryItem.date)}
              </td>
              <td className="border px-4 py-2">
                {enquiryItem.product.productName}
              </td>
              <td className="border px-4 py-2">{enquiryItem.shop.shopName}</td>
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

      {/* Pagination */}
      <div className="mt-4">
        <ul className="flex list-none p-0">
          {Array.from(
            { length: Math.ceil(filteredEnquiry.length / itemsPerPage) },
            (_, index) => (
              <li key={index} className="cursor-pointer">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    currentPage === index + 1 ? "bg-blue-700" : ""
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default EnquiryHistory;
