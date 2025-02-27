import { Button } from "@/components/Common/Button/Button";
import { Card } from "@/components/Common/Card/Card";
import TextArea from "@/components/Common/Input/TextArea";
import useAuth from "@/contexts/AuthContext";
import useBackdropLoader from "@/contexts/LoaderContext";
import { errorToast, successToast } from "@/helpers/toastHelper";
import PostModel from "@/models/Post/PostModel";
import PropsModel, {
  setPropsModel,
} from "@/models/PropsModel";
import { httpPost } from "@/services/ClientHttpService";
import { httpGet } from "@/services/ServerHttpService";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function PostDetail(props: PropsModel<PostModel>) {
  const loader = useBackdropLoader();
  const router = useRouter();
  const auth = useAuth();

  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const registerCommentHandler = async () => {
    const comment = {
      postId: props.data.id,
      text: commentInputRef.current?.value,
    };

    loader.show();
    const response = await httpPost("/api/comment", comment);
    loader.hide();
    if (response.succeeded) {
      successToast("Your comment registered successfuly.");
      router.replace(`/post/${props.data.id}`);
    } else errorToast(response);
  };

  return (
    <>
      <Card>
        <div>
          <i>
            {props.data.categoryTitle} | {props.data.userFullName}
          </i>
        </div>
        <h1 className="mx-0">{props.data.title}</h1>
        <hr></hr>
        <div className="my-2">
          <p>{props.data.content}</p>
        </div>
      </Card>

      <Card>
        <p className="text-xl mb-3">Comments</p>
        <hr></hr>
        {auth.isAuthenticated && (
          <Card>
            <div className="flex flex-row space-x-5">
              <span className="mt-5">Your comment:</span>
              <TextArea
                placeholder="Write your comment ..."
                ref={commentInputRef}
              />
              <Button
                color="green"
                label="Register"
                onClick={registerCommentHandler}
                margin="mt-6"
              />
            </div>
          </Card>
        )}
        {auth.isAuthenticated === false && (
          <div className="mx-5 mt-4 p-3 text-center bg-gray-200 border rounded">
            For register a comment, please sign in first.
          </div>
        )}
        {props.data.comments.length > 0 &&
          props.data.comments.map((c, index) => {
            return (
              <Card key={index}>
                <i className="text-blue-500">
                  {c.userFullName}
                  {"  >>>"}
                </i>
                <p>{c.text}</p>
              </Card>
            );
          })}
      </Card>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const response = await httpGet(
    "/api/v1/post/" + context.params.postId
  );
  let props = setPropsModel<PostModel>(response);

  const commentsResponse = await httpGet(
    "/api/v1/post/comment/" + context.params.postId
  );

  if (commentsResponse.succeeded && props.data)
    props.data!.comments = commentsResponse.data;

  return {
    props,
  };
}
