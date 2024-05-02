import React, { useState } from "react";

const LoanForm = ({ onSaveLoan }) => {
  const [loanData, setLoanData] = useState({
    amount: "",
    duration: "",
    interest: "",
    members: [],
    name: "",
    membershipId: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const handleCheckboxChange = (member) => {
    const index = loanData.members.indexOf(member);
    if (index === -1) {
      setLoanData({ ...loanData, members: [...loanData.members, member] });
    } else {
      const updatedMembers = [...loanData.members];
      updatedMembers.splice(index, 1);
      setLoanData({ ...loanData, members: updatedMembers });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/loanapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loanData),
      });
      if (!response.ok) {
        throw new Error("Failed to save loan");
      }
      // Assuming the response from the server indicates success
      onSaveLoan(loanData);
      setLoanData({
        amount: "",
        duration: "",
        interest: "",
        members: [],
        name: "",
        membershipId: "",
        phoneNumber: "",
      });
    } catch (error) {
      console.error("Error saving loan:", error.message);
      // Handle error state or display error message to the user
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white w-96 mt-10">
      <form onSubmit={handleFormSubmit} className="bg-gray-800 p-8 rounded-lg">
        <div className="mb-4 w-96">
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={loanData.name}
            onChange={handleInputChange}
            placeholder="Enter Name"
            required
            className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:bg-gray-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="membershipId" className="block mb-2">
            SHG Membership ID:
          </label>
          <input
            type="text"
            name="membershipId"
            id="membershipId"
            value={loanData.membershipId}
            onChange={handleInputChange}
            placeholder="Enter SHG Membership ID"
            required
            className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:bg-gray-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-2">
            Phone Number:
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={loanData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter Phone Number"
            required
            className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:bg-gray-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2">
            Loan Amount:
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={loanData.amount}
            onChange={handleInputChange}
            placeholder="Enter Loan Amount"
            required
            className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:bg-gray-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block mb-2">
            Duration (in months):
          </label>
          <input
            type="number"
            name="duration"
            id="duration"
            value={loanData.duration}
            onChange={handleInputChange}
            placeholder="Enter Duration"
            required
            className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:bg-gray-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="interest" className="block mb-2">
            Interest Rate (%):
          </label>
          <input
            type="number"
            name="interest"
            id="interest"
            value={loanData.interest}
            onChange={handleInputChange}
            placeholder="Enter Interest Rate"
            required
            className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:bg-gray-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">SHG Members:</label>
          <div>
            <input
              type="checkbox"
              id="member1"
              name="member1"
              onChange={() => handleCheckboxChange("Member 1")}
              checked={loanData.members.includes("Member 1")}
            />
            <label htmlFor="member1" className="ml-2 text-gray-300">
              Member 1
            </label>
          </div>
          {/* Add more members as needed */}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoanForm;