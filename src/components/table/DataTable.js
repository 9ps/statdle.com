import React, { useState } from "react";
import DataTableTop from "./DataTableTop";
import DataTableContent from "./DataTableContent";
import DataTableSelect from "./DataTableSelect";
import "./dataTable.scss";
import "../how/modalHow.scss";

const DataTable = ({ toggleModal }) => {
  //0 - 23
  const [categoryIndex, setCategoryIndex] = useState("0");

  return (
    <>
      <DataTableTop toggleModal={toggleModal} />
      <DataTableContent categoryIndex={categoryIndex} />
      <DataTableSelect
        categoryIndex={categoryIndex}
        setCategoryIndex={setCategoryIndex}
      />
    </>
  );
};

export default DataTable;
