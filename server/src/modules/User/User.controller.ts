/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { UserServices } from './User.service';
import { UserValidation } from './User.validation';
import { TUser } from './User.interface';
import { isValidObjectId } from 'mongoose';

const GetAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = '1',
      limit = '10',
      sortBy,
      sortOrder,
      userType,
      name,
      email,
      number,
      address,
    } = req.query;

    const pageNumber = Array.isArray(page)
      ? parseInt(page[0] as string, 10)
      : parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const filter: any = {};
    if (userType) filter.userType = userType;
    if (name) filter.name = new RegExp(name as string, 'i'); // case-insensitive regex search
    if (email) filter.email = new RegExp(email as string, 'i');
    if (number) filter.number = new RegExp(number as string, 'i');
    if (address) filter.address = new RegExp(address as string, 'i');

    const sort: any = {};
    if (sortBy) sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const result = await UserServices.GetAllUsers(
      filter,
      sort,
      pageNumber,
      limitNumber,
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Users retrieved successfully',
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

const CreateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const ZodValidation = UserValidation.userValidation.parse(data);
    const result = await UserServices.CreateUserInDB(ZodValidation);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Assuming UserValidation.userUpdateValidation is a Zod schema
const UpdateUser = async (req: Request, res: Response, next: NextFunction) => {
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
    let ZodValidation: Partial<TUser>;
    try {
      ZodValidation = UserValidation.userUpdateValidation.parse(data);
    } catch (validationError: any) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Validation error',
        error: validationError.errors, // Assuming Zod provides detailed errors
      });
    }

    // Update user in the database
    const result = await UserServices.UpdateUserInDB(id, ZodValidation);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const GetSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await UserServices.GetSingleUsers(id);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  GetAllUsers,
  CreateUser,
  UpdateUser,
  GetSingleUser,
};
