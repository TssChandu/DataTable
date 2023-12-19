import React, { useContext, useState } from "react";
import { TableContext } from "../dataTableContext/Tablecontext";

const Input = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const { addRow, searchRows } = useContext(TableContext);
  const [searchText, setSearchText] = useState("");

  // console.log(firstName, lastName, age);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if ((e.target.key = "Enter")) {
      searchRows(e.target.value);
      setSearchText("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRow({ isChecked: false, firstName, lastName, age });
    setFirstName("");
    setAge("");
    setLastName("");
  };

  const handleInput = (e) => {
    switch (e.target.name) {
      case "firstname":
        setFirstName(e.target.value);
        break;
      case "lastname":
        setLastName(e.target.value);
        break;
      case "age":
        setAge(e.target.value);
        break;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-row justify-center items-center">
          <label htmlFor="search" className="mr-3 font-semibold">
            Search
          </label>
          <input
            type="search"
            id="search"
            className="border-2 border-gray-400 p-2 rounded"
            onChange={handleSearch}
          />
        </div>
      </div>
      <form
        className="flex flex-row justify-start items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col m-2">
          <label htmlFor="firstname" className="font-semibold">
            First Name
          </label>
          <input
            type="text"
            className="border-2 border-gray-400 p-2 rounded"
            onChange={handleInput}
            id="firstname"
            name="firstname"
            value={firstName}
          />
        </div>
        <div className="flex flex-col m-2">
          <label htmlFor="lastname" className="font-semibold">
            Last Name
          </label>
          <input
            type="text"
            className="border-2 border-gray-400 p-2 rounded"
            id="lastname"
            onChange={handleInput}
            name="lastname"
            value={lastName}
          />
        </div>
        <div className="flex flex-col m-2">
          <label htmlFor="age" className="font-semibold">
            Age
          </label>
          <input
            type="text"
            className="border-2 border-gray-400 p-2 rounded"
            id="age"
            onChange={handleInput}
            name="age"
            value={age}
          />
        </div>
        <div className="flex flex-col m-2">
          <button
            type="submit"
            className="p-2 bg-orange-300 outline-none border-0 rounded mt-5 font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
