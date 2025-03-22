"use client";
import { useTheme } from "@/lib/state/context/ThemeContext";
// Import ModuleRegistry
import {
  ClientSideRowModelModule,
  ColumnAutoSizeModule,
  ColumnHoverModule,
  CustomFilterModule,
  DateFilterModule,
  ModuleRegistry,
  NumberFilterModule,
  PinnedRowModule,
  RowDragModule,
  RowStyleModule,
  TextFilterModule,
  TooltipModule,
  colorSchemeDarkBlue,
  themeQuartz
} from 'ag-grid-community';
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef } from "react";

// Register the module once (outside the component)

ModuleRegistry.registerModules([
  ColumnAutoSizeModule,
  ColumnHoverModule,
  PinnedRowModule,
  RowStyleModule,
  RowDragModule,
  TooltipModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule,
  ClientSideRowModelModule,
]);

// Dynamic import for client-side only
// const AgGridReact = dynamic(() => import("ag-grid-react").then(mod => mod.AgGridReact), {
//   ssr: false,
// });

interface RowData {
  [key: string]: any;
}

interface ColumnDef {
  field: string;
  [key: string]: any;
}

export const TableComponent = ({
  rowData,
  colDefs,
}: {
  rowData: RowData[] | undefined;
  colDefs: ColumnDef[] | undefined;
}) => {
  const { colorMode = "light" } = useTheme();
  const gridRef = useRef<any>(null); // Ref to access AG Grid API

  // Callback to size columns to content
  const onGridReady = useCallback((params: any) => {
    params.api.sizeColumnsToFit(); // Adjusts column widths to fit content
  }, []);

  if (!rowData || !colDefs || !Array.isArray(rowData) || !Array.isArray(colDefs)) {
    return <div className="p-4 text-center">Loading table data...</div>;
  }
  const myTheme = colorMode === "dark"? themeQuartz.withPart(colorSchemeDarkBlue): themeQuartz


  return (
    <div
      className={
        colorMode === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"
      }
      style={{ width: "100%" }}
    >
      <AgGridReact
      theme={myTheme}
      ref={gridRef}
        domLayout="autoHeight"
        rowData={rowData}
        columnDefs={colDefs}
        onGridReady={onGridReady}
      />
    </div>
  );
};