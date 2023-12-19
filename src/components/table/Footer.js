import React, { useContext, useState } from "react";
import { TableContext } from "../../dataTableContext/Tablecontext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Footer = () => {
  let {
    noOfRows,
    originalRow,
    rowsPerTable,
    pageNumber,
    paginateRowsIncrement,
    paginateRowsDecrement,
  } = useContext(TableContext);

  let pageNo = pageNumber;
  // console.log(pageNo, noOfRows);
  const [tableRows, setTableRows] = useState(5);
  const handleBackward = () => {
    if (pageNumber > 1) {
      pageNo--;
      // console.log("dsdsdf", pageNo);
      paginateRowsDecrement({ pageNo, noOfRows });
    }
  };
  const handleForward = () => {
    // console.log("fddfdafsfd23333333", pageNumber * noOfRows);
    if (originalRow.length > pageNumber * noOfRows) {
      pageNo++;
      paginateRowsIncrement({ pageNo, noOfRows });
    }
  };
  const handleRows = (e) => {
    setTableRows(e.target.value);
    rowsPerTable(e.target.value);
  };
  return (
    <div className="mt-3 flex flex-row justify-end items-center">
      <select
        className="w-[max-content]"
        onChange={handleRows}
        value={tableRows}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>
      <div className="ml-4 flex flex-row items-center">
        <FaChevronLeft onClick={handleBackward} />
        <FaChevronRight onClick={handleForward} />
      </div>
    </div>
  );
};

export default Footer;
