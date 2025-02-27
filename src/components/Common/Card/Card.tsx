"use client";

import React from "react";

interface CardAttributes {
  children: any;
  className?: string;
}

export const Card = (props: CardAttributes) => {
  const classes = `m-5 p-5 bg-white border border-gray-200 rounded ${props.className}`;
  return <div className={classes}>{props.children}</div>;
};
