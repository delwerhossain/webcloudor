/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { CategoryServices } from './Category.service';
import { CategoryValidation } from './Category.validation';

const GetAllCategories = async (
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
      categoryName, // Corrected parameter name
    } = req.query;

    const pageNumber = Array.isArray(page)
      ? parseInt(page[0] as string, 10)
      : parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const filter: any = {};
    if (categoryName)
      filter.name = { $regex: new RegExp(categoryName as string, 'i') };

    const sort: any = {};
    if (sortBy) sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const result = await CategoryServices.GetAllCategoriesInDB(
      filter,
      sort,
      pageNumber,
      limitNumber,
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Categories retrieved successfully',
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

// category update

const UpdateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const ZodValidation =
      CategoryValidation.categoryUpdateValidation.parse(data);
    const result = await CategoryServices.UpdateCategoryInDB(id, ZodValidation);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Category updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const GetSingleCategory = async (
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
  GetSingleCategory,
  UpdateCategory
};
