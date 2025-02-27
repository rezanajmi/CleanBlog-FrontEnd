"use client";

import { errorToast, successToast } from "@/helpers/toastHelper";
import React, { FormEvent, useRef } from "react";
import TextBoxLabel from "../Common/Input/TextBoxLabel";
import { Button } from "../Common/Button/Button";
import { httpPut } from "@/services/ClientHttpService";
import useBackdropLoader from "@/contexts/LoaderContext";

export const ChangeEmail = (props: { onCloseModal: () => void }) => {
  const loader = useBackdropLoader();
  const newEmailInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const credential = {
      email: newEmailInputRef.current?.value ?? "",
    };

    loader.show();
    const response = await httpPut("/api/user/change-email", credential);
    loader.hide();

    if (response.succeeded) {
      successToast(
        "Your email changed successfully, but it needed to confirm.\r\n Please sign in to your entered Email Address and click on sneded link to it."
      );
      props.onCloseModal();
    } else errorToast(response);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <TextBoxLabel label="New Email Address" ref={newEmailInputRef} />
        <div className="text-center">
          <Button color="green" label="Change" type="submit" />
          <Button color="white" label="Cancel" onClick={props.onCloseModal} />
        </div>
      </form>
    </div>
  );
};
