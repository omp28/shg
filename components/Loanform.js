import React, { useState } from "react";

const LoanForm = ({ onSaveLoan }) => {
  const [loanData, setLoanData] = useState({
    amount: "",
    duration: "",
    interest: "",
    members: [],
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSaveLoan(loanData);
    setLoanData({
      amount: "",
      duration: "",
      interest: "",
      members: [],
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <form onSubmit={handleFormSubmit} className="bg-gray-800 p-8 rounded-lg">
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
            <label htmlFor="member1" className="ml-2">
              Member 1
            </label>
          </div>
          {/* <div>
            <input
              type="checkbox"
              id="member2"
              name="member2"
              onChange={() => handleCheckboxChange("Member 2")}
              checked={loanData.members.includes("Member 2")}
            />
            <label htmlFor="member2" className="ml-2">
              Member 2
            </label>
          </div> */}
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
