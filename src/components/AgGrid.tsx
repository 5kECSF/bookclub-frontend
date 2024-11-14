"use client";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
// import "ag-grid-enterprise"
import { useTheme } from "@/lib/state/context/ThemeContext"; // Theme
export const TableComponent = ({
  rowData,
  colDefs,
}: {
  rowData: any;
  colDefs: any;
}) => {
  const { currentTheme, colorMode } = useTheme();

  console.log("theme Mode", currentTheme);
  // useEffect(() => {

  // }, [currentTheme, colorMode]);
  return (
    <div
      className={
        colorMode === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"
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
