import React, { Fragment } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";

import Position from "./Position";

const columnHelper = createColumnHelper();

const parseTime = (hours) => {
  const days = Math.floor(hours / 24);

  return `${days}d ${hours % 24}h`;
};

const columns = [
  columnHelper.accessor("symbol", {
    header: () => "Symbol",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("status", {
    header: () => "State",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("notional", {
    header: () => "Notional",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("lastAction", {
    header: () => "Last Update",
    cell: (info) => parseTime(info.renderValue()),
  }),
  columnHelper.accessor("elapsedTime", {
    header: () => "Elapsed Time",
    cell: (info) => parseTime(info.renderValue()),
  }),
];

const renderSubComponent = ({ row }) => {
  return <Position pos={row.original} />;
};


export default function Positions(props) {
    const positions = props.positions;

  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data: positions,
    columns,
    state: { sorting },
    debugTable: true,
    getRowCanExpand: () => true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div
                    {...{ onClick: header.column.getToggleSortingHandler() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Fragment key={row.id}>
                <tr
                  className="table__row"
                  onClick={() => {
                    console.log(row.id);
                    row.toggleExpanded();
                  }}
                >
                  {/* first row is a normal row */}
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    {/* 2nd row is a custom 1 cell row */}
                    <td colSpan={row.getVisibleCells().length}>
                      {renderSubComponent({ row })}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
