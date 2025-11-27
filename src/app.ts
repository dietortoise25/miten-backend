import express, { type Response, NextFunction } from "express";
import cors from "cors";

import userRouter from "./routes/user.route.ts";
import productRouterForAdmin from "./routes/productRouterForAdmin.route.ts";
import productForCustomerRouter from "./routes/productForCustomer.route.ts";

import { logger, pinoHttpMiddleware } from "./utils/logger.helper.ts";
import rateLimiter from "./utils/rateLimiter.ts";
import globalErrorhandler from "./utils/globalErrorhandler.ts";
import { verifyToken } from "./utils/jwt.helper.ts";

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use(pinoHttpMiddleware);

app.use("/v1", userRouter);

app.use("/v1", productForCustomerRouter);

app.use(async (req: any, res: Response, next: NextFunction): Promise<void> => {
  const authorization = req.headers?.authorization;
  if (!authorization) {
    (res as any).status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const tokenParts = authorization.split(" ");
  if (tokenParts.length !== 2) {
    (res as any).status(401).json({
      message: "Invalid authorization header format",
    });
    return;
  }

  const token = tokenParts[1];
  if (!token) {
    (res as any).status(401).json({
      message: "Token is required",
    });
    return;
  }
  await verifyToken(token);

  return next();
});

app.use("/v1", productRouterForAdmin);

// global error handler
app.use(globalErrorhandler);

// TODO: swagger
logger.info("Server started successfully");

export default app;
