"use client";

import CategoryModel from "@/models/Category/CategoryModel";
import { Button } from "../Common/Button/Button";
import { Card } from "../Common/Card/Card";
import { Table } from "../Common/Table/Table";

const CategoriesList = (props: {
  categories: CategoryModel[];
  onEdit: (category: CategoryModel) => void;
  onAdd: () => void;
}) => {
  const editHandler = (category: CategoryModel) => {
    props.onEdit(category);
  };

  const addHandler = () => {
    props.onAdd();
  };

  return (
    <Card>
      <Button
        label="Add New Category"
        color="blue"
        onClick={addHandler}
        margin="mb-2"
      />
      <Table
        columns={["Id", "Title", "ParentTitle", "Actions"]}
        data={props.categories.map((c: CategoryModel) => {
          return {
            Id: c.id,
            Title: c.title,
            ParentTitle: c.parentTitle,
            actions: (
              <Button
                label="Edit"
                color="yellow"
                onClick={editHandler.bind(null, c)}
                type="button"
              />
            ),
          };
        })}
      />
    </Card>
  );
};

export default CategoriesList;
