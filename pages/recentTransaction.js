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
      <div className="mt-8">
        <h3 className="text-xl mb-2">Recent Transactions</h3>
        <ul>
          {transactions.slice(0, 10).map((transaction, index) => (
            <li key={index} className="mb-4">
              <p>Amount: ₹{transaction.amount}</p>
              <p>Duration: {transaction.duration} months</p>
              <p>Interest Rate: {transaction.interest}%</p>
              <p>Members: {transaction.members}</p>
              <p>Date: {transaction.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
