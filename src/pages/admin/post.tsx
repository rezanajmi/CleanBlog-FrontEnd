import { AddPost } from "@/components/Post/AddPost";
import { EditPost } from "@/components/Post/EditPost";
import { PostList } from "@/components/Post/PostsList";
import { errorToast } from "@/helpers/toastHelper";
import CategoryModel from "@/models/Category/CategoryModel";
import PostModel, { PostListModel } from "@/models/Post/PostModel";
import { httpGet } from "@/services/ClientHttpService";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState<PostListModel>();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostModel>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  const getPosts = async () => {
    const response = await httpGet("/api/post");

    if (response.succeeded == false) {
      errorToast(response);
    } else {
      setPosts(response.data);
    }
  };

  const getCategories = async () => {
    const response = await httpGet("/api/category");

    if (response.succeeded == false) {
      errorToast(response);
    } else {
      setCategories(response.data);
    }
  };

  useEffect(() => {
    getPosts();
    getCategories();
  }, []);

  const showEditFormHandler = (post: PostModel) => {
    setSelectedPost(post);
    setIsAddMode(false);
    setIsEditMode(true);
  };

  const showAddFormHandler = () => {
    setIsEditMode(false);
    setIsAddMode(true);
  };

  const showListHandler = () => {
    getPosts();
    setIsEditMode(false);
    setIsAddMode(false);
  };

  return (
    <div className="items-center">
      <h1>Posts Management</h1>
      {!isEditMode && !isAddMode && (
        <PostList
          posts={posts?.list || []}
          onEdit={showEditFormHandler}
          onAdd={showAddFormHandler}
          onDelete={showListHandler}
        />
      )}
      {isEditMode && (
        <EditPost
          categories={categories}
          post={selectedPost}
          onSave={showListHandler}
          onCancel={showListHandler}
        />
      )}
      {isAddMode && (
        <AddPost
          categories={categories}
          onSave={showListHandler}
          onCancel={showListHandler}
        />
      )}
    </div>
  );
};

export default Posts;
