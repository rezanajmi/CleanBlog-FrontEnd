"use client";

import { useEffect, useRef, useState } from "react";
import PostModel, { PostListModel } from "../../models/Post/PostModel";
import { Button } from "../Common/Button/Button";
import { Card } from "../Common/Card/Card";
import Dropdown from "../Common/Dropdown/Dropdown";
import TextBox from "../Common/Input/TextBox";
import { PostCard } from "./PostCard";
import { errorToast } from "@/helpers/toastHelper";
import { httpGet } from "@/services/ClientHttpService";
import useBackdropLoader from "@/contexts/LoaderContext";

const MainPagePosts = () => {
  const loader = useBackdropLoader();
  const [posts, setPosts] = useState<PostListModel>();
  const [page, setPage] = useState<number>(1);

  const [searchedTitle, setSearchedTitle] = useState<string>();

  const searchedTitleInputRef = useRef<HTMLInputElement>(null);
  const pageItemCountSelectRef = useRef<HTMLSelectElement>(null);

  const searchPostsHandler = async () => {
    const title = searchedTitleInputRef.current?.value;

    loader.show();
    const response = await httpGet(
      `/api/post?searchedTitle=${title}&page=${page}&pageItemCount=${pageItemCountSelectRef.current?.value}`
    );
    loader.hide();

    if (response.succeeded) {
      setPosts(response.data);
      setSearchedTitle(title!);
    } else errorToast(response);
  };

  const handlePrevNextPage = async (next: boolean) => {
    setPage((prevPageNumber) =>
      next ? prevPageNumber + 1 : prevPageNumber - 1
    );
  };

  useEffect(() => {
    searchPostsHandler();
  }, [page]);

  return (
    <>
      <Card className="grid grid-cols-2 gap-2">
        <div>
          <span className="text-lg">
            Filter: {searchedTitle ? searchedTitle : "All Posts"}
          </span>
        </div>
        <div className="flex flex-row space-x-2">
          <TextBox ref={searchedTitleInputRef} placeholder="Search..." />
          <Dropdown
            options={[
              { label: 10, value: 10 },
              { label: 20, value: 20 },
              { label: 30, value: 30 },
            ]}
            ref={pageItemCountSelectRef}
          />
          <Button
            color="blue"
            label="Search"
            onClick={searchPostsHandler}
            margin="m-0"
          />
        </div>
      </Card>

      {posts?.pagingInfo.totalItemsCount === 0 && (
        <p className="text-center">There is no any data.</p>
      )}

      {posts?.pagingInfo.totalItemsCount !== 0 && (
        <>
          {posts?.list.map((post: PostModel, index) => (
            <PostCard key={index} post={post} />
          ))}
          <div className="text-center">
            {posts?.pagingInfo.hasPrevPage && (
              <span
                onClick={handlePrevNextPage.bind(null, false)}
                className="mr-3 border border-gray-300 pb-1 px-2 rounded hover:cursor-pointer"
              >
                {"<<"}
              </span>
            )}
            <span>
              {`${posts?.pagingInfo.page}  of  ${posts?.pagingInfo.pageCount}`}
            </span>
            {posts?.pagingInfo.hasNextPage && (
              <span
                onClick={handlePrevNextPage.bind(null, true)}
                className="ml-3 border border-gray-300 pb-1 px-2 rounded hover:cursor-pointer"
              >
                {">>"}
              </span>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MainPagePosts;
