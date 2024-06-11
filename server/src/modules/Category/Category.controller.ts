import { NextFunction, Request, Response } from 'express';
import { CategoryServices } from './Category.service';
import { CategoryValidation } from './Category.validation';

const GetAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryServices.GetAllCategories();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Categories retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const CreateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const ZodValidation = CategoryValidation.categoryValidation.parse(data);
    const result = await CategoryServices.CreateCategoryInDB(ZodValidation);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Category created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await CategoryServices.GetSingleCategories(id);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Category retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const CategoryControllers = {
  GetAllCategories,
  CreateCategory,
  getSingleCategory,
};
