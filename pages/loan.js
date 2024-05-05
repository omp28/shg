import React, { useState, useEffect } from "react";
import LoanForm from "../components/Loanform";

const Home = () => {
  const [commonPool, setCommonPool] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = '/api/loanapi';

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
        setCommonPool(data);
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
    <div className="flex items-center justify-center h-full bg-black text-white">
      <div className=" mx-20 w-80">
        <h2 className="text-3xl mb-4">Loan Section</h2>
        <p className="mb-4 text-5xl font-bold">Common Pool: ₹{commonPool}</p>
      </div>
      <div className=" mx-20 w-80">
        <LoanForm />
      </div>
    </div>
  );
};

export default Home;
