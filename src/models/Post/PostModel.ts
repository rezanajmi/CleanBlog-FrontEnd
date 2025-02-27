import PagingInfo from "../PagingInfo";
import CommentModel from "./CommentModel";

export default interface PostModel {
  id: number;
  title: string;
  content: string;
  userFullName: string;
  categoryId: number;
  categoryTitle: string;
  comments: CommentModel[];
}

export interface PostListModel {
  list: PostModel[];
  pagingInfo: PagingInfo;
}
