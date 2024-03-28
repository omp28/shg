import React from "react";

const LoginCard = () => {
  return (
    <div className="max-w-xs mx-auto mt-8 bg-black text-white shadow-md rounded px-8 pt-6 pb-8 w-full">
      <h2 className="text-2xl font-bold mb-4 text-center ">Login</h2>
      <div className="mb-4 w-80">
        <label
          className="block text-gray-200 text-sm font-bold mb-2 t"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-600 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="username"
          type="text"
          placeholder="Enter username"
        />
      </div>
      <div className="mb-4 w-80">
        <label
          className="block text-gray-200 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-600 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="password"
          type="password"
          placeholder="Enter password"
        />
      </div>
      <div className="mb-4 w-80">
        <label
          className="block text-gray-200 text-sm font-bold mb-2"
          htmlFor="userType"
        >
          Select User Type:
        </label>
        <select
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-600 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="userType"
        >
          <option>SHG Staff</option>
          <option>SHG Head</option>
        </select>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Login
      </button>
    </div>
  );
};

export default LoginCard;
