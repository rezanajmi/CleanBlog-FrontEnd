"use client";

import ApiResponse from "@/models/ApiResponse";
import { toast } from "react-toastify";

const errorToast = (content: string | ApiResponse<any>) => {
  let errorMessage: string | JSX.Element;
  if (typeof content === "string") errorMessage = content;
  else {
    errorMessage = (
      <div className="ml-4">
        <p>{content.message}</p>
        <ul className="list-disc">
          {content.errors?.map((e, index) => (
            <li key={index}>{e}</li>
          ))}
        </ul>
      </div>
    );
  }
  toast(errorMessage, {
    position: "top-center",
    type: "error",
    className: "w-full max-w-5xl",
  });
};

const infoToast = (content: string) => {
  toast(content, {
    position: "top-center",
    type: "info",
  });
};

const warningToast = (content: string) => {
  toast(content, {
    position: "top-center",
    type: "warning",
  });
};

const successToast = (content: string) => {
  toast(content, {
    position: "top-center",
    type: "success",
  });
};

export { errorToast, infoToast, successToast, warningToast };
