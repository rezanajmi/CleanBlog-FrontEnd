import { httpGet, httpPost, httpPut } from "@/services/ServerHttpService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: any, res: any) {
  switch (req.method) {
    case "GET":
      GetCategories(req, res);
      break;
    case "POST":
      AddCategory(req, res);
      break;
    case "PUT":
      EditCategory(req, res);
      break;
    default:
      return;
  }
}

async function GetCategories(req: NextApiRequest, res: NextApiResponse) {
  const response = await httpGet("/api/v1/category", req.headers.authorization);
  res.status(response.statusCode).json(response);
}

async function AddCategory(req: NextApiRequest, res: NextApiResponse) {
  const response = await httpPost(
    "/api/v1/category",
    req.body,
    req.headers.authorization
  );
  res.status(response.statusCode).json(response);
}

async function EditCategory(req: NextApiRequest, res: NextApiResponse) {
  const response = await httpPut(
    "/api/v1/category",
    req.body,
    req.headers.authorization
  );
  res.status(response.statusCode).json(response);
}
