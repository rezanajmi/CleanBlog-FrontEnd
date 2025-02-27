"use client";

import React from "react";

interface ButtonProps {
  label: string;
  color: "blue" | "red" | "yellow" | "green" | "gray" | "white";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  margin?: string;
}

export const Button = (props: ButtonProps) => {
  const bgClass =
    props.color === "white" ? `bg-${props.color}` : `bg-${props.color}-500`;
  const hoveredBgClass =
    props.color === "white"
      ? `hover:bg-${props.color}`
      : `hover:bg-${props.color}-600`;
  const classes = `max-h-[40px] border border-${
    props.color === "white" ? "gray" : props.color
  }-500 ${
    props.color !== "white" && "text-white"
  } ${bgClass} font-semibold px-3 py-1 ${
    props.margin ? props.margin : "m-1"
  } rounded ${hoveredBgClass} focus:outline-none fucus:ring-2 focus:ring-${
    props.color
  }-00`;
  return (
    <button
      onClick={props.onClick}
      className={classes}
      type={props.type ?? "button"}
    >
      {props.label}
    </button>
  );
};
