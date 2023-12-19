import { createContext, useContext, useReducer, useState } from "react";

const sampleRowData = [
  {
    isChecked: false,
    id: 1,
    firstName: "Jon",
    lastName: "Snow",
    age: 14,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 2,
    firstName: "Cersei",
    lastName: "Lannister",
    age: 31,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 3,
    firstName: "Jaime",
    lastName: "Lannister",
    age: 31,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 4,
    firstName: "Arya",
    lastName: "Stark",
    age: 11,
    isEdit: false,
  },

  {
    isChecked: false,
    id: 5,
    firstName: "Daenerys",
    lastName: "Targaryen",
    age: null,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 6,
    firstName: "",
    lastName: "Melisandre",
    age: 150,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 7,
    firstName: "Ferrara",
    lastName: "Clifford",
    age: 44,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 8,
    firstName: "Rossini",
    lastName: "Frances",
    age: 36,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 9,
    firstName: "Harvey",
    lastName: "Roxie",
    age: 65,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 10,
    firstName: "Jon",
    lastName: "Snow",
    age: 14,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 11,
    firstName: "Cersei",
    lastName: "Lannister",
    age: 31,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 12,
    firstName: "Jaime",
    lastName: "Lannister",
    age: 31,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 13,
    firstName: "Arya",
    lastName: "Stark",
    age: 11,
    isEdit: false,
  },

  {
    isChecked: false,
    id: 14,
    firstName: "Daenerys",
    lastName: "Targaryen",
    age: null,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 15,
    firstName: "",
    lastName: "Melisandre",
    age: 150,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 16,
    firstName: "Ferrara",
    lastName: "Clifford",
    age: 44,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 17,
    firstName: "Rossini",
    lastName: "Frances",
    age: 36,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 18,
    firstName: "Harvey",
    lastName: "Roxie",
    age: 65,
    isEdit: false,
  },
];

const headerRow = [
  {
    id: 1,
    name: "checkbox",
  },
  {
    id: 2,
    name: "ID",
    sort: "none",
  },
  {
    id: 3,
    name: "First Name",
    sort: "none",
  },
  {
    id: 4,
    name: "Last Name",
    sort: "none",
  },
  {
    id: 5,
    name: "Age",
    sort: "none",
  },
  {
    id: 6,
    name: "Full Name",
  },
];

let endIndex;
let startIndex;
let originalData = [];
sampleRowData.forEach((obj) => originalData.push(structuredClone(obj)));

export const TableContext = createContext({
  rows: sampleRowData,
  noOfRows: 5,
  originalRow: sampleRowData,
  pageNumber: 1,
  rowsPerTable: () => {},
  addRow: () => {},
  editInputItem: () => {},
  sortRow: () => {},
  editRowItem: () => {},
  changeCheckedRow: () => {},
  blurInputItem: () => {},
  changeAllChecked: () => {},
  handlePaginateRows: () => {},
});

function rowsReducer(state, action) {
  if (action.type === "add_row") {
    const { data, dummyRows } = action.payload;
    const newList = [
      ...state,
      {
        isChecked: data.isChecked,
        id: dummyRows.length + 1,
        firstName: data.firstName,
        lastName: data.lastName,
        age: parseInt(data.age),
        isEdit: false,
      },
    ];
    return newList;
  } else if (action.type === "sort_row") {
    const { sortType, sort, dummyRows } = action.payload;

    let sortList = [...state].sort((a, b) => {
      // console.log("sort...........", sort);
      if (sort === "none") {
        if (sortType === "firstName" || sortType === "lastName") {
          return a[sortType].localeCompare(b[sortType]);
        }
        return b[sortType] - a[sortType];
      } else if (sort === "asc") {
        if (sortType === "firstName" || sortType === "lastName") {
          return b[sortType].localeCompare(a[sortType]);
        }
        return a[sortType] - b[sortType];
      }
      return null;
    });
    if (sort === "des") {
      let newList = [...dummyRows].sort((a, b) => a.id - b.id);
      sortList = newList;
    }

    // console.log(sortList);

    return sortList;
  } else if (action.type === "dClick_row_item") {
    const { id } = action.payload;
    const editedRows = [...state].map((obj) => {
      if (obj.id === id) {
        return { ...obj, isEdit: true };
      }
      return obj;
    });
    return editedRows;
  } else if (action.type === "blur_row_item") {
    const { id } = action.payload;
    const editedRows = [...state].map((obj) => {
      if (obj.id === id) {
        return { ...obj, isEdit: false };
      }
      return obj;
    });
    return editedRows;
  } else if (action.type === "rows_per_page") {
    // console.log(action.payload);
    let { value, dummyRows } = action.payload;
    return [...dummyRows].slice(0, value);
  } else if (action.type === "change_checked_row") {
    const updatedList = [...state].map((row) => {
      if (row.id === action.payload) {
        return { ...row, isChecked: !row.isChecked };
      }
      return row;
    });
    // console.log(updatedList);
    return updatedList;
  } else if (action.type === "search_rows") {
    let { value, dummyRows } = action.payload;
    console.log(value);
    console.log(dummyRows);
    const searchedList = [...dummyRows].filter(
      (data) =>
        data.firstName.toLowerCase().includes(value.toLowerCase()) ||
        data.lastName.toLowerCase().includes(value.toLowerCase()) ||
        data.age === parseInt(value) ||
        data.id === parseInt(value)
    );
    return searchedList;
  } else if (action.type === "paginate_row_forward") {
    const { pageNo, noOfRows, dummyRows } = action.payload;
    const newState = [...dummyRows];
    // console.log(pageNo, noOfRows);
    endIndex = pageNo * noOfRows;
    startIndex = endIndex - noOfRows;
    console.log(startIndex, endIndex);
    //  console.log(newState);
    let rowsArr = newState.slice(startIndex, endIndex);
    //  console.log(rowsArr);
    return rowsArr;
  } else if (action.type === "paginate_row_backward") {
    const { pageNo, noOfRows, dummyRows } = action.payload;
    const newState = [...dummyRows];
    // console.log(pageNo, noOfRows);
    endIndex = pageNo * noOfRows;
    startIndex = endIndex - noOfRows;
    // console.log(startIndex, endIndex);
    let rowsArr = newState.slice(startIndex, endIndex);
    // console.log(rowsArr);
    return rowsArr;
  } else if (action.type === "all_checked") {
    const { allChecked } = action.payload;
    console.log("handler all checked", allChecked);
    const newArray = [...state].map((data) => ({
      isChecked: (data.isChecked = allChecked),
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age ? parseInt(data.age) : "",
      isEdit: false,
    }));
    console.log(newArray);
    return newArray;
  } else if (action.type === "edit_row_input_item") {
    const { e, objKey, id } = action.payload;
    const reqRowsArr = [...state].map((obj) => {
      if (obj.id === id) {
        return { ...obj, [objKey]: e.target.value };
      }
      return obj;
    });
    return reqRowsArr;
  }

  return state;
}

export default function TableContextProvider({ children }) {
  const [rowsState, rowsDispatch] = useReducer(rowsReducer, sampleRowData);

  let { noOfRows, pageNumber, originalRow } = useContext(TableContext);
  const [rowsNo, setRowsNo] = useState(noOfRows);
  const [dummyRows, setDummyRows] = useState(originalRow);
  const [headRow, setHeadRow] = useState(headerRow);
  const [pageNum, setPageNum] = useState(pageNumber);

  const handleSortRow = ({ name, sort }) => {
    setHeadRow(headerRow);
    // console.log(headRow);
    setPageNum(1);
    const sortType =
      name === "ID"
        ? "id"
        : name === "First Name"
        ? "firstName"
        : name === "Last Name"
        ? "lastName"
        : "age";

    let sortList = dummyRows.sort((a, b) => {
      // console.log("sort...........", sort);
      if (sort === "none") {
        if (sortType === "firstName" || sortType === "lastName") {
          return a[sortType].localeCompare(b[sortType]);
        }
        return b[sortType] - a[sortType];
      } else if (sort === "asc") {
        if (sortType === "firstName" || sortType === "lastName") {
          return b[sortType].localeCompare(a[sortType]);
        }
        return a[sortType] - b[sortType];
      }
      return null;
    });
    if (sort === "des") {
      // console.log(originalData);
      sortList = originalData;
    }

    setDummyRows(sortList);

    rowsDispatch({
      type: "sort_row",
      payload: { sortType, sort, dummyRows },
    });
  };

  const handleAddRow = (data) => {
    const newList = [
      ...dummyRows,
      {
        isChecked: data.isChecked,
        id: dummyRows.length + 1,
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age ? parseInt(data.age) : "",
        isEdit: false,
      },
    ];
    setDummyRows(newList);
    rowsDispatch({
      type: "add_row",
      payload: { data, dummyRows },
    });
  };

  const handleEditRowItem = (id) => {
    const editedRows = dummyRows.map((obj) => {
      if (obj.id === id) {
        return { ...obj, isEdit: true };
      }
      return obj;
    });
    setDummyRows(editedRows);
    rowsDispatch({
      type: "dClick_row_item",
      payload: {
        id,
        dummyRows,
      },
    });
  };

  const handleRowsPerTable = (value) => {
    setRowsNo(value);
    setPageNum(1);
    rowsDispatch({
      type: "rows_per_page",
      payload: { value, dummyRows },
    });
  };

  const handleSearchRows = (value) => {
    rowsDispatch({
      type: "search_rows",
      payload: { value, dummyRows },
    });
  };

  const handleChangeCheckedRow = (id) => {
    setDummyRows(
      dummyRows.map((data) => {
        if (id === data.id) {
          return {
            isChecked: !data.isChecked,
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age ? parseInt(data.age) : "",
            isEdit: false,
          };
        }
        return data;
      })
    );
    rowsDispatch({
      type: "change_checked_row",
      payload: id,
    });
  };

  const handlePaginateIncrement = (obj) => {
    let { pageNo } = obj;

    setPageNum(pageNo);
    rowsDispatch({
      type: "paginate_row_forward",
      payload: { ...obj, dummyRows },
    });
  };

  const handlePaginateDecrement = ({ noOfRows, pageNo }) => {
    setPageNum(pageNo);
    rowsDispatch({
      type: "paginate_row_backward",
      payload: { noOfRows, pageNo, dummyRows },
    });
  };

  const handleChangeAllChecked = (allChecked) => {
    setDummyRows(dummyRows.map((obj) => ({ ...obj, isChecked: allChecked })));
    rowsDispatch({
      type: "all_checked",
      payload: { allChecked },
    });
  };

  const handleBlurInput = (id) => {
    const editedRows = dummyRows.map((obj) => {
      if (obj.id === id) {
        return { ...obj, isEdit: false };
      }
      return obj;
    });

    setDummyRows(editedRows);

    rowsDispatch({
      type: "blur_row_item",
      payload: {
        id,
        dummyRows,
      },
    });
  };

  const handleEditInputItem = (e, objKey, id) => {
    const reqRowsArr = dummyRows.map((obj) => {
      if (obj.id === id) {
        return { ...obj, [objKey]: e.target.value };
      }
      return obj;
    });
    setDummyRows(reqRowsArr);
    rowsDispatch({
      type: "edit_row_input_item",
      payload: {
        e,
        objKey,
        id,
        dummyRows,
      },
    });
  };

  const contextValue = {
    rows: rowsState,
    noOfRows: rowsNo,
    pageNumber: pageNum,
    headerRow: headRow,
    originalRow: dummyRows,
    rowsPerTable: handleRowsPerTable,
    addRow: handleAddRow,
    blurInputItem: handleBlurInput,
    sortRow: handleSortRow,
    editRowItem: handleEditRowItem,
    editInputItem: handleEditInputItem,
    changeCheckedRow: handleChangeCheckedRow,
    changeAllChecked: handleChangeAllChecked,
    searchRows: handleSearchRows,
    paginateRowsIncrement: handlePaginateIncrement,
    paginateRowsDecrement: handlePaginateDecrement,
  };

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
}
