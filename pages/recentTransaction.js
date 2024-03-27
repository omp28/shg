import React, { useState, useEffect } from "react";
import LoanForm from "../components/Loanform";

const Home = () => {
  const [commonPool, setCommonPool] = useState(10000);
  const [transactions, setTransactions] = useState([]);
  console.log("transactions", transactions);

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    const storedCommonPool =
      JSON.parse(localStorage.getItem("commonPool")) || [];
    console.log("storedCommonPool", storedCommonPool);

    setTransactions(storedTransactions);
    setCommonPool(storedCommonPool);
  }, []);

  const handleSaveLoan = (loanData) => {
    const { amount, duration, interest, members } = loanData;
    setCommonPool(commonPool - parseFloat(amount));
    const newTransaction = {
      name: loanData.name,
      phoneNumber: loanData.phoneNumber,
      amount: parseFloat(amount),
      duration: parseInt(duration),
      interest: parseFloat(interest),
      members: members.join(", "),
      date: new Date().toLocaleDateString(),
    };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <div className="flex  justify-center bg-black text-white pt-20 ">
      <div className=" mx-20 w-80 mt-60 ">
        <h2 className="text-3xl mb-4">Loan Section</h2>
        <p className="mb-4 text-5xl font-bold">Common Pool: ₹{commonPool}</p>
      </div>

      <div className="mt-8 mx-20 pb-10 ">
        <h3 className=" mb-4 text-2xl ">Recent Transactions</h3>
        <div className="overflow-y-scroll h-[90vh]">
          <ul className="">
            {transactions.slice(0, 10).map((transaction, index) => (
              <li key={index} className="mb-4">
                <p> Name : {transaction.name}</p>
                <p> Phone Number : {transaction.phoneNumber}</p>
                <p> Amount : {transaction.amount}</p>
                <p> Duration : {transaction.duration} months</p>
                <p> Interest Rate : {transaction.interest}%</p>
                <p> Members : {transaction.members}</p>
                <p> Date : {transaction.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
