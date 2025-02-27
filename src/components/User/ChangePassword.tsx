"use client";

import React, { FormEvent, useRef } from "react";
import TextBoxLabel from "../Common/Input/TextBoxLabel";
import { Button } from "../Common/Button/Button";
import { errorToast, successToast } from "@/helpers/toastHelper";
import { httpPut } from "@/services/ClientHttpService";
import useBackdropLoader from "@/contexts/LoaderContext";

export const ChangePassword = (props: { onCloseModal: () => void }) => {
  const loader = useBackdropLoader();

  const currentPassInputRef = useRef<HTMLInputElement>(null);
  const newPassInputRef = useRef<HTMLInputElement>(null);
  const confirmPassInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const credential = {
      currentPassword: currentPassInputRef.current?.value ?? "",
      newPassword: newPassInputRef.current?.value ?? "",
      confirmNewPassword: confirmPassInputRef.current?.value ?? "",
    };

    loader.show();
    const response = await httpPut("/api/user/change-password", credential);
    loader.hide();

    if (response.succeeded) {
      successToast("Your password changed successfully.");
      props.onCloseModal();
    } else errorToast(response);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <TextBoxLabel
          label="Current Password"
          ref={currentPassInputRef}
          type="password"
        />
        <TextBoxLabel
          label="New Password"
          ref={newPassInputRef}
          type="password"
        />
        <TextBoxLabel
          label="Confirm Password"
          ref={confirmPassInputRef}
          type="password"
        />
        <div className="text-center">
          <Button color="green" label="Change" type="submit" />
          <Button color="white" label="Cancel" onClick={props.onCloseModal} />
        </div>
      </form>
    </div>
  );
};
