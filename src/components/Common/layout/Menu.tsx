"using client";

import Link from "next/link";
import React from "react";
import { Button } from "../Button/Button";
import { useRouter } from "next/router";
import useAuth from "@/contexts/AuthContext";
import useAlert from "@/contexts/AlertContext";

export const Menu = () => {
  const auth = useAuth();
  const alert = useAlert();
  const router = useRouter();

  const loginHandler = () => {
    router.push("/user/login");
  };

  const logoutHandler = () => {
    alert.showAlert("Logout", "Are you sure to log out?", (result: boolean) => {
      if (result) {
        auth.logout();
        router.replace("/");
      }
    });
  };

  return (
    <nav className="m-0 p-5 bg-gray-800">
      <div className="container mx-auto grid grid-cols-2 gap-1">
        <div className="">
          <Link href="/" className="text-white text-3xl font-bold">
            CleanBlog
          </Link>
          <p className="text-white mt-2">
            A Next.js front-end template for CleanBlog back-end project.
          </p>
        </div>
        <div className="text-right">
          {auth.isAuthenticated && (
            <>
              <Link href="/user/profile" className="text-white mr-5 text-xl">
                Profile
              </Link>
              <Link href="/admin" className="text-white mr-5 text-xl">
                Admin
              </Link>
              <Button color="red" label="Logout" onClick={logoutHandler} />
            </>
          )}
          {!auth.isAuthenticated && (
            <Button color="green" label="Login" onClick={loginHandler} />
          )}
        </div>
      </div>
    </nav>
  );
};
