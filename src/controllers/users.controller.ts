import type { LoginRequest, CreateUserRequest } from "../types/Request.ts";
import type { UserResponse, LoginResponse } from "../types/Response.ts";
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

export async function createUser(
  req: CreateUserRequest,
  res: UserResponse
) {
  const { email, password } = (req as any).body;
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
    return (res as any).status(401).json({
      message: "Unauthorized 邮箱或密码错误",
    });
  }

  const token = await generateToken({ email });

  return sendSuccessResponse(res, token);
}
