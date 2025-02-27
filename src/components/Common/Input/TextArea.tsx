"use client";

import React, { forwardRef, LegacyRef } from "react";

interface TextAreaProps {
  placeholder?: string;
  value?: string | number;
  ref?: LegacyRef<HTMLTextAreaElement>;
  disabled?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const inputClasses = `w-full max-w-4xl max-h-[100px] my-2 bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border border-gray-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-gray-400 shadow-sm ${
      props.disabled && "disable"
    }`;
    return (
      <textarea
        placeholder={props.placeholder}
        defaultValue={props.value}
        ref={ref}
        disabled={props.disabled}
        className={inputClasses}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
