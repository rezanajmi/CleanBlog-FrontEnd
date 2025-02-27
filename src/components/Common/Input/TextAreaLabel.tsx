"use client";

import React, { forwardRef, LegacyRef } from "react";

interface TextAreaLabelProps {
  placeholder?: string;
  label: string;
  value?: string | number;
  ref?: LegacyRef<HTMLTextAreaElement>;
  disabled?: boolean;
}

const TextAreaLabel = forwardRef<HTMLTextAreaElement, TextAreaLabelProps>(
  (props, ref) => {
    const inputClasses = `w-full max-w-4xl max-h-[100px] bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border border-gray-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-gray-400 shadow-sm ${
      props.disabled && "disable"
    }`;

    return (
      <div className="max-w-sm min-w-[200px] mb-2">
      <label className="block mb-2 text-sm text-gray-700">
        {props.label}
      </label>
      <textarea
        placeholder={props.placeholder}
        defaultValue={props.value}
        ref={ref}
        disabled={props.disabled}
        className={inputClasses}
      />
    </div>
    );
  }
);

TextAreaLabel.displayName = "TextAreaLabel";

export default TextAreaLabel;
