"use client";

import NextLink from "next/link";
import React from "react";

interface LinkProps {
  label: string;
  href: string;
  textColor?: "blue" | "red" | "yellow" | "green" | "gray" | "white";
}

const Link = (props: LinkProps) => {
  const classes = `border border-gray-400 font-semibold py-2 px-4 m-2 rounded transition duration-200 ease hover:border-gray-600 focus:outline-none fucus:ring-2 focus:ring-${props.textColor}-00`;
  return (
    <NextLink className={classes} href={props.href}>
      {props.label}
    </NextLink>
  );
};

export default Link;
