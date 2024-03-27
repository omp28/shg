import React from "react";
import { Link } from "react-router-dom";
import LoginCard from "@/components/LoginCrad";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <LoginCard />
    </div>
  );
};

export default Home;
