"use client";

import React from "react";
import { Card } from "../Common/Card/Card";
import PostModel from "@/models/Post/PostModel";
import Link from "../Common/Button/Link";

export const PostCard = (props: { post: PostModel }) => {
  return (
    <Card key={props.post.id} className="mx-64 grid grid-cols-2">
      <div>
        <i>
          {props.post.categoryTitle} | {props.post.userFullName}
        </i>
        <h2 className="mb-2 text-2xl bold">{props.post.title}</h2>
      </div>
      <div className="text-right pt-5">
        <Link label="View" href={"/post/" + props.post.id} />
      </div>
    </Card>
  );
};
