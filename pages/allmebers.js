import { useEffect, useState } from "react";

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMembers = () => {
      const storedMembers = JSON.parse(
        localStorage.getItem("newMember") || "[]"
      );
      if (Array.isArray(storedMembers)) {
        setMembers(storedMembers);
      } else {
        console.error(
          "Data retrieved from localStorage is not an array:",
          storedMembers
        );
        setMembers([]);
      }
      setLoading(false);
    };

    getMembers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto pt-20">
      <h1 className="text-3xl font-bold mb-6">All Members</h1>
      <div className="grid grid-cols-1 gap-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <h2 className="text-xl font-bold mb-2">{member.name}</h2>
            <p className="text-gray-600 mb-2">Age: {member.age}</p>
            <p className="text-gray-600 mb-2">Address: {member.address}</p>
            <p className="text-gray-600 mb-2">
              Monthly Income: ${member.monthlyIncome}
            </p>
            <p className="text-gray-600">
              Marriage Status: {member.marriageStatus}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMembers;
