import React, { useState, useEffect } from "react";
import LoanForm from "../components/Loanform";

const Home = () => {
  const [commonPool, setCommonPool] = useState(10000); // Initial common pool amount
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from localStorage on component mount
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  const handleSaveLoan = (loanData) => {
    const { amount, duration, interest, members } = loanData;
    // Update common pool
    setCommonPool(commonPool - parseFloat(amount));
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
    // Save transactions to localStorage
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h2 className="text-3xl mb-4">Loan Section</h2>
      <p className="mb-4">Common Pool: ${commonPool}</p>
      <LoanForm onSaveLoan={handleSaveLoan} />
    </div>
  );
};

export default Home;
