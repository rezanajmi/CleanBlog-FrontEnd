"use client";

import CategoryModel from "@/models/Category/CategoryModel";
import { useRef } from "react";
import { Card } from "../Common/Card/Card";
import TextBoxLabel from "../Common/Input/TextBoxLabel";
import { Button } from "../Common/Button/Button";
import { errorToast, successToast } from "@/helpers/toastHelper";
import DropdownLabel from "../Common/Dropdown/DropdownLabel";
import { httpPut } from "@/services/ClientHttpService";
import useBackdropLoader from "@/contexts/LoaderContext";

const EditCategory = (props: {
  categories: CategoryModel[];
  category: CategoryModel | undefined;
  onSave: () => void;
  onCancel: () => void;
}) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const parentInputRef = useRef<HTMLSelectElement>(null);
  const loader = useBackdropLoader();

  const submitHandler = async (event: any) => {
    event.preventDefault();

    const editedCategory = {
      id: props.category?.id,
      title: titleInputRef.current?.value,
      parentId: parentInputRef.current?.value,
    };

    loader.show();
    const response = await httpPut("/api/category", editedCategory);
    loader.hide();

    if (response.succeeded == false) {
      errorToast(response);
    } else {
      successToast("Category edited successfully.");
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
          <TextBoxLabel label="Id" value={props.category?.id} disabled={true} />
          <TextBoxLabel
            label="Title"
            value={props.category?.title}
            ref={titleInputRef}
          />
          <DropdownLabel
            label="Parent"
            defaultText="Without Parent"
            options={props.categories.map((c) => {
              return { value: c.id, label: c.title };
            })}
            ref={parentInputRef}
            selectedValue={props.category?.parentId}
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

export default EditCategory;
