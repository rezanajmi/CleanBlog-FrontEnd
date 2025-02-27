"use client";

import React, { forwardRef, LegacyRef } from "react";

interface DropdownLabelOptionModel {
  value: number | string;
  label: number | string;
}

interface DropdownProps {
  options: DropdownLabelOptionModel[];
  selectedValue?: number | string;
  onSelect?: (event: React.MouseEvent<HTMLSelectElement>) => void;
  ref?: LegacyRef<HTMLSelectElement>;
  disabled?: boolean;
  defaultText?: string;
}

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>((props, ref) => {
  const classes =
    "w-full max-w-[200px] max-h-[40px] bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border border-gray-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-gray-400 shadow-sm";
  return (
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
  );
});

Dropdown.displayName = "Dropdown";

export default Dropdown;
