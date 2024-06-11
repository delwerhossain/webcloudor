import { NextFunction, Request, Response } from 'express';
import { ReviewServices } from './Review.service';
import { ReviewValidation } from './Review.validation';

const CreateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const ZodValidation = ReviewValidation.reviewValidation.parse(data);
    const result = await ReviewServices.CreateReviewInDB(ZodValidation);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Review created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const GetAllReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ReviewServices.GetAllReviewsInDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Reviews retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const ReviewControllers = {
  CreateReview,
  GetAllReview,
};
