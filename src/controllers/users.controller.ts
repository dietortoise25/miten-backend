import type { Request, Response } from "express";
import type { LoginRequest } from "../types/Request.ts";
import type { LoginResponse, SuccessUserResponse } from "../types/Response.ts";
import {
  createUser as createUserApi,
  verifyUser,
} from "../services/user.service.ts";
import {
  sendAddSuccessResponse,
  sendSuccessResponse,
} from "../utils/response.helper.ts";
import { generateToken } from "../utils/jwt.helper.ts";
import AppError from "../utils/AppError.ts";

interface CreateUserRequest {
  email: string;
  password: string;
}

export async function createUser(
  req: Request<CreateUserRequest>,
  res: Response<SuccessUserResponse>
) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError(`Email and password are required`, 400, "Bad request");
  }

  const createdUser = await createUserApi(email, password);

  return sendAddSuccessResponse(res, createdUser);
}

export async function login(req: LoginRequest, res: LoginResponse) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(`Email and password are required`, 400, "Bad request");
  }

  const result = await verifyUser(email, password);

  if (!result) {
    return res.status(401).json({
      message: "Unauthorized 邮箱或密码错误",
    });
  }

  const token = await generateToken({ email });

  return sendSuccessResponse(res, token);
}
