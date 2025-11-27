import type { Request } from "express";
import type { Product } from "./Product.ts";
import type { User } from "./User.ts";

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface CreateUserRequest extends Request {
  body: User;
}

export interface ProductsRequest extends Request {
  body: Product;
}
