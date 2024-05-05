import { useEffect, useState } from "react";

const AllMembers = () => {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "/api/amemberapi";

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
        setMembers(data);
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

  return (
    <div className="max-w-md mx-auto pt-20">
      <h1 className="text-3xl font-bold mb-6">All Members</h1>
      <div className="grid grid-cols-1 gap-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <h2 className="text-xl font-bold mb-2">{member.NAME}</h2>
            <p className="text-gray-600 mb-2">Age: {member.age}</p>
            <p className="text-gray-600 mb-2">Address: {member.Address}</p>
            <p className="text-gray-600 mb-2">
              Monthly Income: ${member.Salary}
            </p>
            <p className="text-gray-600">
              Marriage Status: {member.Marital_Status === 1? "Married": "Single"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMembers;
