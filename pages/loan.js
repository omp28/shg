import React, { useState, useEffect } from "react";
import LoanForm from "../components/Loanform";

const Home = () => {
  const initialCommonPool = 10000; // Initial common pool amount

  // State to manage common pool amount
  const [commonPool, setCommonPool] = useState(initialCommonPool);

  // State to manage transactions
  const [transactions, setTransactions] = useState([]);

  // Function to retrieve transactions and common pool from localStorage
  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);

    const storedCommonPool = JSON.parse(localStorage.getItem("commonPool"));
    if (storedCommonPool !== null) {
      setCommonPool(storedCommonPool);
    } else {
      setCommonPool(initialCommonPool); // If not found, set to initial value
    }
  }, []);

  // Function to handle saving loan transaction
  const handleSaveLoan = (loanData) => {
    const { amount, duration, interest, members } = loanData;

    // Update common pool
    const updatedCommonPool = commonPool - parseFloat(amount);
    setCommonPool(updatedCommonPool);

    // Add transaction
    const newTransaction = {
      amount: parseFloat(amount),
      duration: parseInt(duration),
      interest: parseFloat(interest),
      members: members.join(", "),
      date: new Date().toLocaleDateString(),
    };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);

    // Save common pool and transactions to localStorage
    localStorage.setItem("commonPool", JSON.stringify(updatedCommonPool));
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <div className="flex items-center justify-center h-full bg-black text-white">
      <div className=" mx-20 w-80">
        <h2 className="text-3xl mb-4">Loan Section</h2>
        <p className="mb-4 text-5xl font-bold">Common Pool: ₹{commonPool}</p>
      </div>
      <div className=" mx-20 w-80">
        <LoanForm onSaveLoan={handleSaveLoan} />
      </div>
    </div>
  );
};

export default Home;
