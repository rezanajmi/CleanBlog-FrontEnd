import { httpPost, httpPut } from "@/services/ServerHttpService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      break;
    case "POST":
      CreateUser(req, res);
      break;
    case "PUT":
      EditUser(req, res);
      break;
    default:
      return;
  }
}

async function CreateUser(req: NextApiRequest, res: NextApiResponse) {
  const response = await httpPost("/api/v1/User", req.body);
  res.status(response.statusCode).json(response);
}

async function EditUser(req: NextApiRequest, res: NextApiResponse) {
  const response = await httpPut(
    "/api/v1/User",
    req.body,
    req.headers.authorization
  );
  res.status(response.statusCode).json(response);
}
