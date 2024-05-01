// pages/add-new-member.js

import { useState } from "react";

const AddNewMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    monthlyIncome: "",
    marriageStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Object.values(formData).every((value) => value !== "")) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const existingMembers = JSON.parse(localStorage.getItem("newMember")) || [];

    const updatedMembers = Array.isArray(existingMembers)
      ? [...existingMembers, formData]
      : [formData];

    localStorage.setItem("newMember", JSON.stringify(updatedMembers));

    setFormData({
      name: "",
      age: "",
      address: "",
      monthlyIncome: "",
      marriageStatus: "",
    });

    alert("New member added successfully!");
  };

  return (
    <div className="max-w-md mx-auto pt-28">
      <h1 className="text-2xl font-bold mb-4">Add New Member</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="age"
          >
            Age
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="age"
            type="number"
            placeholder="Enter age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            placeholder="Enter address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="monthlyIncome"
          >
            Monthly Income
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="monthlyIncome"
            type="number"
            placeholder="Enter monthly income"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="marriageStatus"
          >
            Marriage Status
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="marriageStatus"
            name="marriageStatus"
            value={formData.marriageStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select marriage status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddNewMember;
