"use client";

import * as checkServerClient from "./checkServerClientHelper";
import { destroyCookie, setCookie, parseCookies } from "nookies";

const tokenItemKey = "accessToken";

const getToken = () => {
  if (checkServerClient.isServer()) return "";

  const accessToken = parseCookies()[tokenItemKey];
  return accessToken ?? "";
};

const setToken = (token: string) => {
  if (checkServerClient.isServer()) return;

  setCookie(null, tokenItemKey, token, {
    maxAge: 10 * 24 * 60 * 60,
    path: "/",
  });
};

const removeToken = () => {
  if (checkServerClient.isServer()) return;

  destroyCookie(null, tokenItemKey, {
    path: "/",
  });
};

export { getToken, setToken, removeToken };
