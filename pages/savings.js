import React, { useEffect, useState } from "react";

const Savings = () => {
  const [shgMembers, setShgMembers] = useState([]);

  useEffect(() => {
    const savedMembers = localStorage.getItem("savings");
    if (savedMembers) {
      setShgMembers(JSON.parse(savedMembers));
    }
  }, []);

  return (
    <div className="pt-20 mx-10">
      <h3 className="text-2xl mb-4">Savings Section</h3>
      <div className="grid grid-cols-4 gap-4">
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

export default Savings;
