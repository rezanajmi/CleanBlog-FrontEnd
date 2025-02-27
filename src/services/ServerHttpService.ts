import ApiResponse from "@/models/ApiResponse";

let initialResponse: ApiResponse<any> = {
  succeeded: true,
  statusCode: 200,
  message: "",
  errors: [],
  data: null,
};

export async function httpGet(
  url: string,
  token: string = "",
  errorCallback: ((error: any) => ApiResponse<any>) | undefined = undefined
) {
  return await sendHttp(url, "GET", undefined, token, errorCallback);
}

export async function httpPost(
  url: string,
  body: any,
  token: string = "",
  errorCallback: ((error: any) => ApiResponse<any>) | undefined = undefined
) {
  return await sendHttp(url, "POST", body, token, errorCallback);
}

export async function httpPut(
  url: string,
  body: any,
  token: string = "",
  errorCallback: ((error: any) => ApiResponse<any>) | undefined = undefined
) {
  return await sendHttp(url, "PUT", body, token, errorCallback);
}

export async function httpDelete(
  url: string,
  token: string = "",
  errorCallback: ((error: any) => ApiResponse<any>) | undefined = undefined
) {
  return await sendHttp(url, "DELETE", undefined, token, errorCallback);
}

async function sendHttp(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body: any,
  token: string = "",
  errorCallback: ((error: any) => ApiResponse<any>) | undefined = undefined
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
      {
        method: method,
        body: method === "GET" ? undefined : JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.ok && response.status !== 400) {
      return await handleErrors(response.status);
    }

    if (response.ok && !response.body) {
      initialResponse.statusCode = 200;
      return initialResponse;
    }

    const apiResponse: ApiResponse<any> = await response.json();
    apiResponse.statusCode = response.status;
    return apiResponse;
  } catch (error: any) {
    if (errorCallback !== undefined) {
      return errorCallback(error);
    } else {
      initialResponse.succeeded = false;
      initialResponse.statusCode = 500;
      initialResponse.message = `There is a unexpected error on server.\r\n${error.message}`;
      return initialResponse;
    }
  }
}

async function handleErrors(statusCode: number) {
  initialResponse.succeeded = false;
  initialResponse.statusCode = statusCode;
  switch (statusCode) {
    case 100:
      initialResponse.message =
        "There is a network error. Please check your network and try again.";
      break;
    case 401:
      initialResponse.message = "Unauthenticated user!";
      break;
    case 403:
      initialResponse.message = "Access denied!";
      break;
    case 404:
      initialResponse.message = "Not Found!";
      break;
    case 405:
      initialResponse.message = "HTTP method is wrong!";
      break;
    case 500:
      initialResponse.message =
        "Internal Server Error. Please contact support.";
      break;
    default:
      initialResponse.message = "There is a unexpected error.";
      break;
  }
  return initialResponse;
}

export function generateQueryString(query: object) {
  let queryString = "";
  Object.entries(query).map(([key, value], index) => {
    if (index !== 0) queryString += "&";
    queryString += `${key}=${value}`;
  });
  return queryString;
}
