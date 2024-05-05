import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="/" className="text-xl font-bold">
            SHG Portal
          </a>
        </div>
        <ul className="flex">
          <li className="ml-4">
            <a href="/loan" className="hover:text-gray-300">
              Loan
            </a>
          </li>
          <li className="ml-4">
            <a href="/recentTransaction" className="hover:text-gray-300">
              Recent-Transactions
            </a>
          </li>
          <li className="ml-4">
            <a href="/savings" className="hover:text-gray-300">
              Savings
            </a>
          </li>
          <li className="ml-4">
            <a href="/addsaving" className="hover:text-gray-300">
              Add Saving
            </a>
          </li>
          <li className="ml-4">
            <a href="/addsaving" className="hover:text-gray-300">
              Add Saving
            </a>
          </li>
          <li className="ml-4">
            <a href="/addnewmember" className="hover:text-gray-300">
              Add New Member
            </a>
          </li>
          <li className="ml-4">
            <a href="/allmebers" className="hover:text-gray-300">
              All Members
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;