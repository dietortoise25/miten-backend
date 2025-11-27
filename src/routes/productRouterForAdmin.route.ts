import express from "express";
import {
  countProduct,
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/products.controller.ts";

const router = express.Router();

router.get("/products-manage/count", countProduct);
router
  .route("/products-manage")
  .get(getProducts)
  .post(createProduct)
  .patch(updateProduct);
router
  .route("/products-manage/:productId")
  .get(getProductById)
  .delete(deleteProductById);

export default router;
