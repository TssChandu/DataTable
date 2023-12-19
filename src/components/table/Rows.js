import React, { useContext } from "react";
import { TableContext } from "../../dataTableContext/Tablecontext";

const Rows = () => {
  const {
    rows,
    noOfRows,
    changeCheckedRow,
    editRowItem,
    blurInputItem,
    editInputItem,
  } = useContext(TableContext);
  // console.log(rows);
  const resultedRows = rows.slice(0, noOfRows);

  const handleCheckedRow = (id) => {
    changeCheckedRow(id);
  };

  const doubleClick = (id) => {
    editRowItem(id);
  };

  const handleInputBlur = (id) => {
    blurInputItem(id);
  };

  const handleInputChange = (e, objKey, id) => {
    editInputItem(e, objKey, id);
  };

  return (
    <div className="flex flex-col justify-start w-full">
      {resultedRows.map((row, index) => (
        <div key={index}>
          <div className="flex flex-row justify-start hover:bg-slate-200">
            <div className="flex flex-row">
              {Object.keys(row).map((objKey, value) => {
                if (objKey === "isChecked") {
                  return (
                    <input
                      type="checkbox"
                      className="mx-4 p-2 order-1"
                      checked={row[objKey]}
                      key={value}
                      onChange={() => handleCheckedRow(row.id)}
                    />
                  );
                } else if (objKey === "id") {
                  return (
                    <div key={value} className="w-40 m-2 p-2 order-2">
                      <p>{row[objKey]}</p>
                    </div>
                  );
                } else if (!["id", "fullName", "isEdit"].includes(objKey)) {
                  return row.isEdit ? (
                    <input
                      type="text"
                      className="w-40 m-2 p-2 order-2"
                      key={value}
                      value={row[objKey]}
                      onChange={(e) => handleInputChange(e, objKey, row.id)}
                      onBlur={() => handleInputBlur(row.id)}
                    />
                  ) : (
                    <div
                      key={value}
                      className="w-40 m-2 p-2 order-2"
                      onDoubleClick={() => doubleClick(row.id)}
                    >
                      <p>{row[objKey]}</p>
                    </div>
                  );
                }
                return "";
              })}
            </div>
            <p className="w-40 m-2 p-2 ">{`${row.firstName} ${row.lastName}`}</p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Rows;
