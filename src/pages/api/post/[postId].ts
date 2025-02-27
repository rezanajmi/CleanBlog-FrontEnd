import { httpGet } from "@/services/ServerHttpService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await httpGet(
    `/api/v1/post?id=${req.query.id}`,
    req.headers.authorization
  );
  res.status(response.statusCode).json(response);
}
