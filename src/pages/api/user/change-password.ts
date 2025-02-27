import { httpPut } from "@/services/ServerHttpService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await httpPut(
    "/api/v1/User/password",
    req.body,
    req.headers.authorization
  );
  res.status(response.statusCode).json(response);
}
