/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { ProductServices } from './Product.service';
import { ProductValidation } from './Product.validation';

const GetAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      page = '1',
      limit = '10',
      sortBy,
      sortOrder,
      minPrice,
      maxPrice,
      categoryID,
      uploadByUserID,
    } = req.query;

    const pageNumber = Array.isArray(page)
      ? parseInt(page[0] as string, 10)
      : parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const filter: any = {};
    if (minPrice) filter.price = { $gte: parseFloat(minPrice as string) };
    if (maxPrice)
      filter.price = { ...filter.price, $lte: parseFloat(maxPrice as string) };
    if (categoryID) filter.categoryID = categoryID;
    if (uploadByUserID) filter.uploadByUserID = uploadByUserID;

    const sort: any = {};
    if (sortBy) sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const result = await ProductServices.GetAllProducts(
      filter,
      sort,
      pageNumber,
      limitNumber,
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Products retrieved successfully',
      meta: {
        page: pageNumber,
        limit: limitNumber,
        total: result.total,
      },
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

const CreateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const ZodValidation: any =
      ProductValidation.productCreateValidation.parse(data);
    const result = await ProductServices.CreateProductInDB(ZodValidation);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Product created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Assuming ProductValidation.productUpdateValidation is a Zod schema

const UpdateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // MongoDB ID validation
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid ObjectId format',
      });
    }

    // Validate the data using Zod -- Partial<TProduct>
    let ZodValidation: any;
    try {
      ZodValidation = ProductValidation.productUpdateValidation.parse(data);
    } catch (validationError: any) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Validation error',
        error: validationError.errors, // Assuming Zod provides detailed errors
      });
    }

    // Update product in the database
    const result = await ProductServices.UpdateProductInDB(id, ZodValidation);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await ProductServices.GetSingleProducts(id);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Product retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const ProductControllers = {
  GetAllProducts,
  CreateProduct,
  UpdateProduct,
  getSingleProduct,
};
