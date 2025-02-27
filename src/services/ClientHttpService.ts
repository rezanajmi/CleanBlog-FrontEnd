"use client";

import ApiResponse from "@/models/ApiResponse";
import { getToken, removeToken } from "../helpers/cookieHelper";

let initialResponse: ApiResponse<any> = {
  succeeded: true,
  statusCode: 200,
  message: "",
  errors: [],
  data: null,
};

export async function httpGet(
  url: string,
  errorCallback: ((error: any) => ApiResponse<any>) | undefined = undefined
) {
  return await sendHttp(url, "GET", null, errorCallback);
}

export async function httpPost(
  url: string,
  body: any,
  errorCallback: ((error: any) => ApiResponse<any>) | undefined = undefined
) {
  return await sendHttp(url, "POST", body, errorCallback);
}

export async function httpPut(
  url: string,
  body: any,
  errorCallback: ((error: any) => ApiResponse<any>) | undefined = undefined
) {
  return await sendHttp(url, "PUT", body, errorCallback);
}

export async function httpDelete(
  url: string,
  errorCallback: ((error: any) => ApiResponse<any>) | undefined = undefined
) {
  return await sendHttp(url, "DELETE", errorCallback);
}

async function sendHttp(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body: any,
  errorCallback: ((error: any) => ApiResponse<any>) | undefined = undefined
) {
  try {
    const token = getToken();

    const response = await fetch(url, {
      method: method,
      body:
        method === "GET" || method === "DELETE"
          ? undefined
          : JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    const apiResponse: ApiResponse<any> = await response.json();

    if (apiResponse.statusCode === 401 && token) {
      removeToken();
    }

    return apiResponse;
  } catch (error: any) {
    if (errorCallback !== undefined) {
      return errorCallback(error);
    } else {
      initialResponse.succeeded = false;
      initialResponse.statusCode = 500;
      initialResponse.message = `There is a unexpected error on client.\r\n${error.message}`;
      return initialResponse;
    }
  }
}
