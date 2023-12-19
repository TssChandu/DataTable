import React from "react";
import Header from "./Header";
import Rows from "./Rows";

const Table = () => {
  return (
    <div className="border-2 border-gray-400 rounded mt-4">
      <Header />
      <hr />
      <Rows />
    </div>
  );
};

export default Table;
