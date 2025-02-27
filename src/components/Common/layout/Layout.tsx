"using client";

import React from "react";
import { Menu } from "./Menu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Layout = (props: any) => {
  return (
    <>
      <ToastContainer />
      <Menu />
      <main className="my-5 mx-64">{props.children}</main>
    </>
  );
};
