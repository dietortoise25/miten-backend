import {
  sendNotFoundResponse,
  sendSuccessResponse,
  sendAddSuccessResponse,
} from "../utils/response.helper.ts";
import AppError from "../utils/AppError.ts";
import type { ProductsRequest } from "../types/Request.ts";
import {
  getProducts as getProductsApi,
  getProductById as getProductByIdApi,
  deleteProductById as deleteProductByIdApi,
  createProduct as createProductApi,
  updateProduct as updateProductApi,
  countProduct as countProductApi,
} from "../services/product.service.ts";
import { ProductResponse } from "../types/Response.ts";

interface ExtendedProductsRequest extends ProductsRequest {
  query: {
    page?: string;
    limit?: string;
    search?: string;
  };
  params: {
    productId?: string;
  };
}

export async function getProducts(req: ExtendedProductsRequest, res: ProductResponse) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const search = req.query.search || "";

  const offset: number = (page - 1) * limit;

  const products = await getProductsApi(limit, offset, search);
  if (!products) {
    return sendNotFoundResponse(res);
  }
  return sendSuccessResponse(res, products);
}

export async function getProductById(
  req: ExtendedProductsRequest,
  res: ProductResponse
) {
  const product = await getProductByIdApi(Number(req.params.productId));

  if (product) {
    return sendSuccessResponse(res, product);
  }

  return sendNotFoundResponse(res);
}

export async function deleteProductById(
  req: ExtendedProductsRequest,
  res: ProductResponse
) {
  const productId = Number(req.params.productId);

  if (!productId) {
    throw new AppError(`The productId is required`, 400, "Bad request");
  }

  const deletedProductNumber = await deleteProductByIdApi(productId);

  if (!deletedProductNumber) {
    return sendNotFoundResponse(res);
  }

  return sendSuccessResponse(res, deletedProductNumber);
}

export async function createProduct(
  req: ExtendedProductsRequest,
  res: ProductResponse
) {
  const addProduct = (req as any).body;

  if (!addProduct) {
    throw new AppError(`The product is required`, 400, "Bad request");
  }

  try {
    const addedProduct = await createProductApi(addProduct);

    return sendAddSuccessResponse(res, addedProduct);
  } catch (error: any) {
    if (error.message && error.message.includes('duplicate key value violates unique constraint')) {
      throw new AppError(`Product with id ${addProduct.id} already exists`, 409, 'Conflict');
    }
    throw new AppError(`Failed to create product: ${error.message}`, 500, 'Internal Server Error');
  }
}

export async function updateProduct(
  req: ExtendedProductsRequest,
  res: ProductResponse
) {
  const updateProduct = (req as any).body;

  const updatedProductNumber = await updateProductApi(updateProduct);

  if (!updatedProductNumber) {
    return sendNotFoundResponse(res);
  }

  return sendSuccessResponse(res, updatedProductNumber);
}

export async function countProduct(req: ExtendedProductsRequest, res: ProductResponse) {
  const search = req.query.search;
  // if (!search) {
  //   throw new AppError(`The search is required`, 400, "Bad request");
  // }
  const productCount = await countProductApi(search);

  return sendSuccessResponse(res, productCount);
}
