import React, { useEffect, useState } from "react";

const Savings = () => {
  const [shgMembers, setShgMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = '/api/getsavingsapi';

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setShgMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  console.log(shgMembers);

  return (
    <div className="pt-20 mx-10">
      <h3 className="text-2xl mb-4">Savings Section</h3>
      <div className="grid grid-cols-4 gap-4">
        {shgMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
          >
            <h4 className="text-xl font-semibold mb-2">{member.NAME}</h4>
            <p>ID: {member.MemberID}</p>
            <p>Amount Contributed: ₹{member.Amount}</p>
            <p>Date: {member.Date_of_Contribution.substr(0,10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Savings;