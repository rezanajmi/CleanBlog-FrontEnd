"use client";

import { FormEvent, useRef } from "react";
import { Card } from "../Common/Card/Card";
import TextBoxLabel from "../Common/Input/TextBoxLabel";
import { Button } from "../Common/Button/Button";
import { httpPost } from "@/services/ClientHttpService";
import { errorToast, successToast } from "@/helpers/toastHelper";
import DropdownLabel from "../Common/Dropdown/DropdownLabel";
import CategoryModel from "@/models/Category/CategoryModel";
import useBackdropLoader from "@/contexts/LoaderContext";

const AddCategory = (props: {
  categories: CategoryModel[];
  onSave: () => void;
  onCancel: () => void;
}) => {
  const loader = useBackdropLoader();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const parentIdInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const addedCategory = {
      title: titleInputRef.current?.value,
      parentId: parentIdInputRef.current?.value,
    };

    loader.show();
    const response = await httpPost("/api/category", addedCategory);
    loader.hide();

    if (response.succeeded == false) {
      errorToast(response);
    } else {
      successToast("Category added successfully.");
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
          <DropdownLabel
            label="Parent"
            defaultText="Without Parent"
            options={props.categories.map((c) => {
              return { label: c.title, value: c.id };
            })}
            ref={parentIdInputRef}
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

export default AddCategory;
