import type { NextFunction, Request, Response } from "express";
import { sendJsonResponse } from "./response.helper.ts";

export default function (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const { name = "Unknown Error", message = "Something broke!" } = err;

  console.log("global: ", name, message);

  return sendJsonResponse(res, 500, message);
}
