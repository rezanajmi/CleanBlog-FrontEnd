"use client";

import React from "react";

interface TableProps {
  columns: string[];
  data: any[];
}

const GenerateValues = async (data: any[], values: string[][]) => {
  for (let item of data) {
    let itemValues: string[] = [];
    for (let key in item) {
      itemValues.push(item[key]);
    }
    values.push(itemValues);
  }
};

export const Table = (props: TableProps) => {
  let values: string[][] = [];
  GenerateValues(props.data, values);

  return (
    <table className="min-w-full bg-white border border-gray-200 mt-2">
      <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
          {props.columns.map((c, index) => (
            <th key={index} className="py-3 px-6">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm">
        {values.map((item: string[], index: number) => {
          return (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              {item.map((value, index) => (
                <td key={index} className="py-3 px-6">
                  {value}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
