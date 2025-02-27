"use client";

import React, { forwardRef, LegacyRef } from "react";

interface DropdownLabelOptionModel {
  value: number | string;
  label: number | string;
}

interface DropdownLabelProps {
  label: string;
  options: DropdownLabelOptionModel[];
  selectedValue?: number | string;
  onSelect?: (event: React.MouseEvent<HTMLSelectElement>) => void;
  ref?: LegacyRef<HTMLSelectElement>;
  disabled?: boolean;
  defaultText?: string;
}

const DropdownLabel = forwardRef<HTMLSelectElement, DropdownLabelProps>(
  (props, ref) => {
    const classes =
      "w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border border border-gray-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-gray-400 shadow-sm";
    return (
      <div className="w-full max-w-sm min-w-[200px] mb-2">
        <label className="block mb-2 text-sm text-gray-700">
          {props.label}
        </label>
        <select
          onSelect={props.onSelect}
          className={classes}
          ref={ref}
          disabled={props.disabled}
          defaultValue={props.selectedValue}
        >
          {props.defaultText && <option value="-1">{props.defaultText}</option>}
          {props.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

DropdownLabel.displayName = "DropdownLabel";

export default DropdownLabel;
