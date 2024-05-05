import React, { useState, useEffect } from "react";

const Home = () => {
  const [commonPool, setCommonPool] = useState();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = '/api/transactionsapi'

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        let data = await response.json();
        setCommonPool(data.pop())
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching members:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransactions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="flex  justify-center bg-black text-white pt-20 ">
      <div className=" mx-20 w-80 mt-60 ">
        <p className="mb-4 text-5xl font-bold">Common Pool: ₹{commonPool}</p>
      </div>

      <div className="mt-8 mx-20 pb-10 ">
        <h3 className=" mb-4 text-2xl ">Recent Transactions</h3>
        <div className="overflow-y-scroll h-[90vh]">
          <ul className="">
            {transactions.slice(0, 10).reverse().map((transaction, index) => (
              <li key={index} className="mb-4 w-50">
                {transaction.type === "Loan" ? (
                  <>
                    <p>Member ID: {transaction.lmid}</p>
                    <p>Name: {transaction.NAME}</p>
                    <p>Amount: {transaction.loan_amount}</p>
                    <p>Interest Rate: {transaction.Interest_Rate}%</p>
                    <p>Duration: {transaction.duration} months</p>
                    <p>Date: {transaction.Date_Of_Issue.substr(0,10)}</p>
                    <p>Type: {transaction.type}</p>
                  </>
                ) : transaction.type === "Contribution" ? (
                    <>
                      <p>Member ID: {transaction.cmid}</p>
                      <p>Name: {transaction.NAME}</p>
                      <p>Amount: {transaction.ca}</p>
                      <p>Date: {transaction.DoC.substr(0,10)}</p>
                      <p>Type: {transaction.type}</p>
                    </>
                ): null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
