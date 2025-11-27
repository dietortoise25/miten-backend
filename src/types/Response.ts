import type { Response as ExpressResponse } from "express";
import type { Product } from "./Product.ts";
import type { User } from "./User.ts";

export interface ErrorResponseBody {
  message: string;
  data?: any;
}

export interface SuccessProductResponseBody {
  message: string;
  data: Product | Product[];
}

export interface SuccessUserResponseBody {
  message: string;
  data: User | User[];
}

export interface LoginResponseBody {
  message: string;
  data?: string; // 例如 token
}

// 产品相关响应：支持发送错误或成功的响应体
export type ProductResponse = ExpressResponse<
  ErrorResponseBody | SuccessProductResponseBody
>;

// 用户相关响应
export type UserResponse = ExpressResponse<
  ErrorResponseBody | SuccessUserResponseBody
>;

// 登录响应
export type LoginResponse = ExpressResponse<LoginResponseBody>;
