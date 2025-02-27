"use client";

import PostModel from "@/models/Post/PostModel";
import React from "react";
import { Card } from "../Common/Card/Card";
import { Button } from "../Common/Button/Button";
import { Table } from "../Common/Table/Table";
import { errorToast, successToast } from "@/helpers/toastHelper";
import { useRouter } from "next/router";
import useAlert from "@/contexts/AlertContext";
import { httpDelete } from "@/services/ClientHttpService";
import useBackdropLoader from "@/contexts/LoaderContext";

export const PostList = (props: {
  posts: PostModel[];
  onEdit: (post: PostModel) => void;
  onAdd: () => void;
  onDelete: () => void;
}) => {
  const router = useRouter();
  const alert = useAlert();
  const loader = useBackdropLoader();

  const showHandler = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  const editHandler = (post: PostModel) => {
    props.onEdit(post);
  };

  const addHandler = () => {
    props.onAdd();
  };

  const deleteHandler = (postId: number, postTitle: string) => {
    alert.showAlert(
      `Delete Post: ${postTitle}`,
      "Are you sure to delete this post?",
      async (result) => {
        if (result) {
          loader.show();
          const response = await httpDelete(`/api/post?id=${postId}`);
          loader.hide();
          if (response.succeeded) {
            successToast("Post deleted successfully.");
            props.onDelete();
          } else {
            errorToast(response);
          }
        }
      }
    );
  };

  return (
    <Card>
      <Button label="Add New Post" color="blue" onClick={addHandler} />
      <Table
        columns={["Id", "Title", "Category Title", "Actions"]}
        data={props.posts.map((p: PostModel) => {
          return {
            id: p.id,
            title: p.title,
            categorytitle: p.categoryTitle,
            actions: (
              <>
                <Button
                  label="Show"
                  color="gray"
                  onClick={showHandler.bind(null, p.id)}
                  type="button"
                />
                <Button
                  label="Edit"
                  color="yellow"
                  onClick={editHandler.bind(null, p)}
                  type="button"
                />
                <Button
                  label="Delete"
                  color="red"
                  onClick={deleteHandler.bind(null, p.id, p.title)}
                  type="button"
                />
              </>
            ),
          };
        })}
      />
    </Card>
  );
};
