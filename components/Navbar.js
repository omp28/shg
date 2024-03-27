import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a to="/" className="text-xl font-bold">
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
              Recent Transactions
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
