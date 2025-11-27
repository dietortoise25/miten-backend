import type { Response } from "express";

export function sendJsonResponse(
  res: Response,
  statusCode: number,
  message: string = "",
  data?: any
) {
  return res.status(statusCode).json({
    message,
    ...(data !== null && data !== undefined ? { data } : {}),
  });
}

export function sendSuccessResponse<T>(res: Response, data?: T) {
  return sendJsonResponse(res, 200, "Success", data);
}

export function sendAddSuccessResponse<T>(res: Response, data?: T) {
  return sendJsonResponse(res, 201, "Success", data);
}

export function sendNotFoundResponse(res: Response, message = "Not Found") {
  return sendJsonResponse(res, 404, message);
}
