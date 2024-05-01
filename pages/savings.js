import React from "react";

const savings = () => {
  const shgMembers = [
    { id: 1, name: "Om ", amount: 5000, date: "2024-03-27" },
    { id: 2, name: "Romit ", amount: 6000, date: "2024-03-26" },
    { id: 3, name: "Aaditya ", amount: 4500, date: "2024-03-25" },
    { id: 4, name: "Neha Patel", amount: 7000, date: "2024-03-24" },
    { id: 5, name: "Rohit ", amount: 5500, date: "2024-03-23" },
    { id: 6, name: "Anjali Gupta", amount: 4800, date: "2024-03-22" },
    // Add more members as needed
  ];

  return (
    <div className="pt-20 mx-10">
      <h3 className="text-2xl mb-4">Savings Section</h3>
      <div className=" grid grid-cols-4 gap-4">
        {shgMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
          >
            <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
            <p>ID: {member.id}</p>
            <p>Amount Contributed: ₹{member.amount}</p>
            <p>Date: {member.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default savings;
