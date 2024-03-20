"use client";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
// import "ag-grid-enterprise"
import { useTheme } from "@/lib/context/ThemeContext"; // Theme

export const TableComponent = ({
  rowData,
  colDefs,
}: {
  rowData: any;
  colDefs: any;
}) => {
  const { currentTheme } = useTheme();
  // console.log("theme Mode", currentTheme)
  return (
    <div
      className={
        currentTheme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"
      }
      style={{
        // height: 500,
        width: "100%",
      }}
    >
      <AgGridReact
        domLayout="autoHeight"
        rowData={rowData}
        columnDefs={colDefs}
      />
    </div>
  );
};
