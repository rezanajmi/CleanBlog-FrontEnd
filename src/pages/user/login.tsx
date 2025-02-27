import { FormEvent, useEffect, useRef } from "react";
import { httpPost } from "@/services/ClientHttpService";
import TextBoxLabel from "@/components/Common/Input/TextBoxLabel";
import { Button } from "@/components/Common/Button/Button";
import { Card } from "@/components/Common/Card/Card";
import { errorToast } from "@/helpers/toastHelper";
import { useRouter } from "next/router";
import Link from "next/link";
import useAuth from "@/contexts/AuthContext";
import withAuthRedirect from "@/middlewares/withAuthRedirectMiddleware";
import { GetServerSidePropsContext } from "next";
import useBackdropLoader from "@/contexts/LoaderContext";

export default function Login(props: { invalidToken: boolean }) {
  const auth = useAuth();
  const loader = useBackdropLoader();
  const router = useRouter();

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.invalidToken) {
      auth.logout();
    }
  }, []);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const credential = {
      username: usernameInputRef.current?.value ?? "",
      password: passwordInputRef.current?.value ?? "",
    };

    loader.show();
    const response = await httpPost("/api/user/login", credential);
    loader.hide();

    if (response.succeeded) {
      auth.login(response.data?.token);
      router.replace("/");
    } else errorToast(response);
  };

  return (
    <>
      <h1>Sign In</h1>
      <div className="flex justify-center">
        <Card className="w-full max-w-lg">
          <form onSubmit={submitHandler}>
            <TextBoxLabel type="text" label="Username" ref={usernameInputRef} />
            <TextBoxLabel
              type="password"
              label="Password"
              ref={passwordInputRef}
            />
            <div className="text-center mt-5">
              <Button color="blue" label="Login" type="submit" />
            </div>
          </form>
          <div className="mt-3">
            <p>
              Dont have any profile? &nbsp;
              <Link className="text-blue-700" href="/user/signup">
                Sing Up
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
    const { invalidToken } = context.query;

    return {
      props: { invalidToken: invalidToken ?? false },
    };
  }
);
