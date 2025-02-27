"use client";

import React, { forwardRef, LegacyRef } from "react";

interface TextBoxProps {
  type?: string;
  placeholder?: string;
  value?: string | number;
  ref?: LegacyRef<HTMLInputElement>;
  disabled?: boolean;
}

const TextBox = forwardRef<HTMLInputElement, TextBoxProps>((props, ref) => {
  const inputClasses = `w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border border border-gray-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-gray-400 shadow-sm ${
    props.disabled && "disable"
  }`;
  return (
    <div className="w-full max-w-sm min-w-[200px] mb-2">
      <input
        type={props.type}
        placeholder={props.placeholder}
        defaultValue={props.value}
        ref={ref}
        disabled={props.disabled}
        className={inputClasses}
      />
    </div>
  );
});

TextBox.displayName = "TextBox";

export default TextBox;
