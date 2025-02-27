import { Button } from "@/components/Common/Button/Button";
import { Card } from "@/components/Common/Card/Card";
import DropdownLabel from "@/components/Common/Dropdown/DropdownLabel";
import TextBoxLabel from "@/components/Common/Input/TextBoxLabel";
import { AppModal } from "@/components/Common/Modal/AppModal";
import { ChangeEmail } from "@/components/User/ChangeEmail";
import { ChangePassword } from "@/components/User/ChangePassword";
import { errorToast, successToast } from "@/helpers/toastHelper";
import PropsModel, { setPropsModel } from "@/models/PropsModel";
import ProfileModel from "@/models/User/ProfileModel";
import { httpPut } from "@/services/ClientHttpService";
import { httpGet } from "@/services/ServerHttpService";
import { GetServerSidePropsContext } from "next";
import React, { FormEvent, useRef, useState } from "react";
import nookies from "nookies";
import useBackdropLoader from "@/contexts/LoaderContext";

function Profile(props: PropsModel<ProfileModel>) {
  const loader = useBackdropLoader();
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);
  const [showChangeEmailModal, setShowChangeEmailModal] =
    useState<boolean>(false);

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const familyInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const genderInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const credential = {
      name: nameInputRef.current?.value ?? "",
      family: familyInputRef.current?.value ?? "",
      age: ageInputRef.current?.value ?? "",
      gender: genderInputRef.current?.value
        ? +genderInputRef.current.value
        : -1,
    };

    loader.show();
    const response = await httpPut("/api/user", credential);
    loader.hide();
    if (response.succeeded) {
      successToast("Your info changed successfully.");
    } else errorToast(response);
  };

  const changeEmailHandler = () => {
    setShowChangeEmailModal(true);
  };

  const changePasswordHandler = () => {
    setShowChangePasswordModal(true);
  };

  const closeModalHandler = () => {
    setShowChangeEmailModal(false);
    setShowChangePasswordModal(false);
  };

  return (
    <>
      <h1>Profile</h1>
      <AppModal
        isOpen={showChangeEmailModal || showChangePasswordModal}
        closeModal={closeModalHandler}
        title={showChangeEmailModal ? "Change Email" : "Change Password"}
      >
        {showChangeEmailModal && (
          <ChangeEmail onCloseModal={closeModalHandler} />
        )}
        {showChangePasswordModal && (
          <ChangePassword onCloseModal={closeModalHandler} />
        )}
      </AppModal>
      <Card>
        <div className="mb-3">
          <Button
            color="blue"
            label="Change Email"
            onClick={changeEmailHandler}
          />
          <Button
            color="blue"
            label="Change Password"
            onClick={changePasswordHandler}
          />
        </div>
        <hr></hr>
        <div className="flex justify-center">
          <form onSubmit={submitHandler} className="mt-3 w-full max-w-lg">
            <TextBoxLabel
              type="text"
              label="Username"
              ref={usernameInputRef}
              value={props.data.username}
              disabled={true}
            />
            <TextBoxLabel
              type="text"
              label="Name"
              ref={nameInputRef}
              value={props.data.name}
            />
            <TextBoxLabel
              type="text"
              label="Family"
              ref={familyInputRef}
              value={props.data.family}
            />
            <TextBoxLabel
              type="number"
              label="Age"
              ref={ageInputRef}
              value={props.data.age}
            />
            <DropdownLabel
              options={[
                { value: 0, label: "Male" },
                { value: 1, label: "Female" },
              ]}
              label="Gender"
              ref={genderInputRef}
              selectedValue={props.data.gender}
            />
            <div className="text-center mt-5">
              <Button color="green" label="Save Changes" type="submit" />
            </div>
          </form>
        </div>
      </Card>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = nookies.get(context);
  const token = cookies["accessToken"];

  const response = await httpGet("/api/v1/user", `bearer ${token}`);
  let props = setPropsModel<ProfileModel>(response);

  return {
    props,
  };
}

export default Profile;
