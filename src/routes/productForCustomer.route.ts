import express from "express";
import {
  countProduct,
  getProductById,
  getProducts,
} from "../controllers/products.controller.ts";

const router = express.Router();

router.get("/products/count", countProduct);
router.route("/products").get(getProducts);
router.route("/products/:productId").get(getProductById);

export default router;
