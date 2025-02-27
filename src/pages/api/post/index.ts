import {
  generateQueryString,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "@/services/ServerHttpService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: any, res: any) {
  switch (req.method) {
    case "GET":
      GetPosts(req, res);
      break;
    case "POST":
      AddPost(req, res);
      break;
    case "PUT":
      EditPost(req, res);
      break;
    case "DELETE":
      DeletePost(req, res);
      break;
    default:
      return;
  }
}

async function GetPosts(req: NextApiRequest, res: NextApiResponse) {
  const response = await httpGet(
    `/api/v1/post?${generateQueryString(req.query)}`,
    req.headers.authorization
  );
  res.status(response.statusCode).json(response);
}

async function AddPost(req: NextApiRequest, res: NextApiResponse) {
  const response = await httpPost(
    "/api/v1/post",
    req.body,
    req.headers.authorization
  );
  res.status(response.statusCode).json(response);
}

async function EditPost(req: NextApiRequest, res: NextApiResponse) {
  const response = await httpPut(
    "/api/v1/post",
    req.body,
    req.headers.authorization
  );
  res.status(response.statusCode).json(response);
}

async function DeletePost(req: NextApiRequest, res: NextApiResponse) {
  const response = await httpDelete(
    `/api/v1/post?id=${req.query.id}`,
    req.headers.authorization
  );
  res.status(response.statusCode).json(response);
}
