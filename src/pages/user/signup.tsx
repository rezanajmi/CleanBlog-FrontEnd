import { Button } from "@/components/Common/Button/Button";
import { Card } from "@/components/Common/Card/Card";
import DropdownLabel from "@/components/Common/Dropdown/DropdownLabel";
import TextBoxLabel from "@/components/Common/Input/TextBoxLabel";
import useBackdropLoader from "@/contexts/LoaderContext";
import { errorToast, successToast } from "@/helpers/toastHelper";
import withAuthRedirect from "@/middlewares/withAuthRedirectMiddleware";
import { httpPost } from "@/services/ClientHttpService";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useRef } from "react";

export default function SignUp() {
  const loader = useBackdropLoader();
  const router = useRouter();

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const familyInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const genderInputRef = useRef<HTMLSelectElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const credential = {
      username: usernameInputRef.current?.value ?? "",
      name: nameInputRef.current?.value ?? "",
      family: familyInputRef.current?.value ?? "",
      age: ageInputRef.current?.value ?? "",
      gender: genderInputRef.current?.value
        ? +genderInputRef.current.value
        : -1,
      email: emailInputRef.current?.value ?? "",
      password: passwordInputRef.current?.value ?? "",
      confirmPassword: confirmPasswordInputRef.current?.value ?? "",
    };

    loader.show();
    const response = await httpPost("/api/user", credential);
    loader.hide();
    if (response.succeeded) {
      successToast("Your are signed Up successfully.");
      router.replace("/user/login");
    } else errorToast(response);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <div className="flex justify-center">
        <Card className="w-full max-w-lg">
          <form onSubmit={submitHandler} className="">
            <TextBoxLabel type="text" label="Username" ref={usernameInputRef} />
            <TextBoxLabel type="text" label="Name" ref={nameInputRef} />
            <TextBoxLabel type="text" label="Family" ref={familyInputRef} />
            <TextBoxLabel
              type="number"
              label="Age"
              ref={ageInputRef}
              value={18}
            />
            <DropdownLabel
              options={[
                { value: 0, label: "Male" },
                { value: 1, label: "Female" },
              ]}
              label="Gender"
              ref={genderInputRef}
            />
            <TextBoxLabel type="text" label="Email" ref={emailInputRef} />
            <TextBoxLabel
              type="password"
              label="Password"
              ref={passwordInputRef}
            />
            <TextBoxLabel
              type="password"
              label="ConfirmPassword"
              ref={confirmPasswordInputRef}
            />
            <div className="text-center mt-5">
              <Button color="blue" label="Sign Up" type="submit" />
            </div>
          </form>
          <div className="mt-3">
            <p>
              Already have an account?{" "}
              <Link className="text-blue-700" href="/user/login">
                Log In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}

export const getServerSideProps = withAuthRedirect(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  }
);
