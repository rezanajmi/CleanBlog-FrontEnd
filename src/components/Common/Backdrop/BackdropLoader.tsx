"use client";

import React from "react";
import { RotatingLines } from "react-loader-spinner";

interface BackdropLoaderProps {
  loading?: boolean;
}

export const BackdropLoader = (props: BackdropLoaderProps) => {
  return (
    <>
      {props.loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <RotatingLines width="150" strokeColor="white" strokeWidth="3" />
        </div>
      )}
    </>
  );
};
