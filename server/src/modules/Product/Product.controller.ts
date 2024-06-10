import { NextFunction, Request, Response } from 'express';
import { ProductServices } from './Product.service';
import { ProductValidation } from './Product.validation';
import { TProduct } from './Product.interface';
import { isValidObjectId } from 'mongoose';

const GetAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ProductServices.GetAllProducts();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Products retrieved successfully',
      data: result,
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
    const ZODvalidation = ProductValidation.productValidation.parse(data);
    const result = await ProductServices.CreateProductInDB(ZODvalidation);
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

    // Validate the data using Zod
    let ZODvalidation: Partial<TProduct>;
    try {
      ZODvalidation = ProductValidation.productUpdateValidation.parse(data);
    } catch (validationError) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Validation error',
        error: validationError.errors,  // Assuming Zod provides detailed errors
      });
    }

    // Update product in the database
    const result = await ProductServices.UpdateProductInDB(id, ZODvalidation);

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
