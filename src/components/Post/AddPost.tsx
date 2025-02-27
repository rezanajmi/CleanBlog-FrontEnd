"use client";

import { errorToast, successToast } from "@/helpers/toastHelper";
import CategoryModel from "@/models/Category/CategoryModel";
import React, { FormEvent, useRef } from "react";
import { Card } from "../Common/Card/Card";
import TextBoxLabel from "../Common/Input/TextBoxLabel";
import DropdownLabel from "../Common/Dropdown/DropdownLabel";
import { Button } from "../Common/Button/Button";
import { httpPost } from "@/services/ClientHttpService";
import useBackdropLoader from "@/contexts/LoaderContext";
import TextArea from "../Common/Input/TextArea";
import TextAreaLabel from "../Common/Input/TextAreaLabel";

export const AddPost = (props: {
  categories: CategoryModel[];
  onSave: () => void;
  onCancel: () => void;
}) => {
  const loader = useBackdropLoader();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const categoryIdInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const addedPost = {
      title: titleInputRef.current?.value,
      content: contentInputRef.current?.value,
      categoryId: categoryIdInputRef.current?.value,
    };

    loader.show();
    const response = await httpPost("/api/post", addedPost);
    loader.hide();

    if (response.succeeded == false) {
      errorToast(response);
    } else {
      successToast("Post added successfully.");
      props.onSave();
    }
  };

  const cancelHandler = async (event: any) => {
    props.onCancel();
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg">
        <form onSubmit={submitHandler}>
          <TextBoxLabel label="Title" ref={titleInputRef} />
          <TextAreaLabel label="Content" ref={contentInputRef} />
          <DropdownLabel
            label="Category"
            defaultText="Without Parent"
            options={props.categories.map((c) => {
              return { label: c.title, value: c.id };
            })}
            ref={categoryIdInputRef}
          />
          <div className="text-center mt-5">
            <Button color="green" label="Add" type="submit" />
            <Button color="white" label="Cancel" onClick={cancelHandler} />
          </div>
        </form>
      </Card>
    </div>
  );
};
