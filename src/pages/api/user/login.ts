import { httpPost } from "@/services/ServerHttpService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await httpPost("/api/v1/User/signin", req.body);
  res.status(response.statusCode).json(response);
}
