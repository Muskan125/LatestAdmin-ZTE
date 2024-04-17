import React, { useState } from "react";
import axios from "axios";

const Formm = ({ onUpdate }) => {
  const [name, setName] = useState("");
  const [fields, setFields] = useState([
    {
      keyname: "",
      keyType: "",
      isvariant: false,
      isfilter: false,
      ismandatory: false,
    },
  ]);

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleAddField = () => {
    const newField = {
      keyname: "",
      keyType: "",
      isvariant: false,
      isfilter: false,
      ismandatory: false,
    };
    const updatedFields = [...fields, newField];
    setFields(updatedFields);
  };

  const handleDeleteField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        fields.some(
          (field) =>
            !field.keyname ||
            !field.keyType ||
            field.isfilter === undefined ||
            field.isvariant === undefined ||
            field.ismandatory === undefined
        ) ||
        !name
      ) {
        return window.alert("Please fill all the information");
      }

      const formData = new FormData();
      formData.append("name", name);
      fields.forEach((field) => {
        formData.append("keyname[]", field.keyname);
        formData.append("keyType[]", field.keyType);
        formData.append("ismandatory[]", field.ismandatory ? "true" : "false");
        formData.append("isfilter[]", field.isfilter ? "true" : "false");
        formData.append("isvariant[]", field.isvariant ? "true" : "false");
      });

      await axios.post(
        "https://onestore-vert.vercel.app/add-specifications",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      window.alert("Data added successfully");

      setFields([
        {
          keyname: "",
          keyType: "",
          isvariant: false,
          isfilter: false,
          ismandatory: false,
        },
      ]);
      setName("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h5 className="text-lg font-semibold"> Name</h5>
      <input
        type="text"
        className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/5 focus:outline-none focus:border-blue-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-center">Key</th>
            <th className="text-center">Data Type</th>
            <th className="text-center">Variant</th>
            <th className="text-center">Filter</th>
            <th className="text-center">Mandatory</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={index}>
              <td className="mr-4 py-2">
                <input
                  type="text"
                  value={field.keyname}
                  onChange={(e) =>
                    handleFieldChange(index, "keyname", e.target.value)
                  }
                  className="shadow border rounded w-full py-1 px-2 text-sm leading-tight focus:outline-none focus:shadow-outline"
                />
              </td>
              <td className="mr-4 py-2">
                <select
                  value={field.keyType}
                  onChange={(e) =>
                    handleFieldChange(index, "keyType", e.target.value)
                  }
                  className="shadow border rounded w-full py-1 px-2 text-sm leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Data Type</option>
                  <option value="String">String</option>
                  <option value="Number">Number</option>
                  <option value="Boolean">Boolean</option>
                </select>
              </td>
              <td className="mr-4 py-2">
                <input
                  type="checkbox"
                  checked={field.isvariant}
                  onChange={() =>
                    handleFieldChange(index, "isvariant", !field.isvariant)
                  }
                />
              </td>
              <td className="mr-4 py-2">
                <input
                  type="checkbox"
                  checked={field.isfilter}
                  onChange={() =>
                    handleFieldChange(index, "isfilter", !field.isfilter)
                  }
                />
              </td>
              <td className="mr-4 py-2">
                <input
                  type="checkbox"
                  checked={field.ismandatory}
                  onChange={() =>
                    handleFieldChange(index, "ismandatory", !field.ismandatory)
                  }
                />
              </td>
              <td className="mr-4 py-2">
                <button
                  type="button"
                  onClick={() => handleDeleteField(index)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={handleAddField}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Add More Key
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Form
        </button>
      </div>
    </form>
  );
};

export default Formm;
