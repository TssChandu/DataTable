import React from "react";
import Input from "../components/Input";
import Table from "../components/table";
import Footer from "../components/table/Footer";

const Home = () => {
  return (
    <div className="flex flex-row justify-center items-center min-h-screen py-10">
      <div className="flex flex-col justify-center items-center">
        <Input />
        <Table />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
