import React, { useContext, useEffect, useState } from "react";
import { TableContext } from "../../dataTableContext/Tablecontext";

const Header = () => {
  const { sortRow, headerRow, originalRow, changeAllChecked } =
    useContext(TableContext);

  let a = 0;
  originalRow.forEach((obj) => {
    if (obj.isChecked) {
      a++;
    }
  });
  // console.log(a);

  // console.log("OriginalRows length", originalRow.length);

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [hRows, setHRows] = useState(headerRow);

  const getSortSymbol = (item) => {
    // console.log(item);
    if (item?.sort === "none") {
      const newHRows = hRows.map((col) => {
        if (col.name === item.name) return { ...col, sort: "asc" };
        return col;
      });
      setHRows(newHRows);
    } else if (item?.sort === "asc") {
      const newHRows = hRows.map((col) => {
        if (col.name === item.name) return { ...col, sort: "des" };
        return col;
      });
      setHRows(newHRows);
      // return <span>↓</span>;
    } else if (item?.sort === "des") {
      const newHRows = hRows.map((col) => {
        if (col.name === item.name) return { ...col, sort: "none" };
        return col;
      });
      setHRows(newHRows);
      // return <span>↑</span>;
    }
  };

  const handleAllChecked = () => {
    setIsAllChecked((prev) => !prev);
    changeAllChecked(!isAllChecked);
  };

  const handleHeaderSort = (item) => {
    // console.log(item);
    if (item?.sort) {
      sortRow({ name: item.name, sort: item.sort });
      getSortSymbol(item);
    }
  };

  useEffect(() => {
    // console.log(a, originalRow);
    if (a === originalRow.length) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [originalRow.length, a]);

  return (
    <div className="flex flex-row justify-start">
      {hRows.map((item) => (
        <div
          className="hover:border-x-2 hover:border-gray-400 m-2 p-2"
          key={item.id}
          onClick={() => handleHeaderSort(item)}
        >
          {item.name === "checkbox" ? (
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={handleAllChecked}
            />
          ) : (
            <div className="flex flex-row">
              <h1 className="font-semibold text-lg w-36">{item.name}</h1>
              {item?.sort === "asc" && <span> ↑</span>}
              {item?.sort === "des" && <span> ↓</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Header;
