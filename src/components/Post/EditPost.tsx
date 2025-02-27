import { errorToast, successToast } from "@/helpers/toastHelper";
import PostModel from "@/models/Post/PostModel";
import React, { useRef } from "react";
import { Card } from "../Common/Card/Card";
import TextBoxLabel from "../Common/Input/TextBoxLabel";
import DropdownLabel from "../Common/Dropdown/DropdownLabel";
import { Button } from "../Common/Button/Button";
import CategoryModel from "@/models/Category/CategoryModel";
import { httpPut } from "@/services/ClientHttpService";
import useBackdropLoader from "@/contexts/LoaderContext";
import TextAreaLabel from "../Common/Input/TextAreaLabel";

export const EditPost = (props: {
  categories: CategoryModel[];
  post: PostModel | undefined;
  onSave: () => void;
  onCancel: () => void;
}) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const categoryInputRef = useRef<HTMLSelectElement>(null);
  const loader = useBackdropLoader();

  const submitHandler = async (event: any) => {
    event.preventDefault();

    const editedPost = {
      id: props.post?.id,
      title: titleInputRef.current?.value,
      content: contentInputRef.current?.value,
      categoryId: categoryInputRef.current?.value,
    };

    loader.show();
    const response = await httpPut("/api/post", editedPost);
    loader.hide();

    if (response.succeeded == false) {
      errorToast(response);
    } else {
      successToast("Post edited successfully.");
      props.onSave();
    }
  };

  const cancelHandler = async () => {
    props.onCancel();
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg">
        <form onSubmit={submitHandler}>
          <TextBoxLabel label="Id" value={props.post?.id} disabled={true} />
          <TextBoxLabel
            label="Title"
            value={props.post?.title}
            ref={titleInputRef}
          />
          <TextAreaLabel
            label="Content"
            value={props.post?.content}
            ref={contentInputRef}
          />
          <DropdownLabel
            label="Category"
            defaultText="Without Parent"
            options={props.categories.map((c) => {
              return { value: c.id, label: c.title };
            })}
            ref={categoryInputRef}
            selectedValue={props.post?.categoryId}
          />
          <div className="text-center mt-5">
            <Button color="green" label="Edit" type="submit" />
            <Button color="white" label="Cancel" onClick={cancelHandler} />
          </div>
        </form>
      </Card>
    </div>
  );
};
