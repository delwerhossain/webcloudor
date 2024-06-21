import { NextFunction, Request, Response } from 'express';
import { ReviewServices } from '../modules/Review/Review.service';
import { OrderServices } from '../modules/Order/Order.service';

const GetSingleOrderWithReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.getSingleOrderInDB(orderId);
    if (Object.keys(result as object).length > 0) {
      const reviews =
        await ReviewServices.GetallReviewsForAsingleUserInDB(orderId);

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Order retrieved successfully',
        data: { order: result, reviews: reviews },
      });
    }
  } catch (err) {
    next(err);
  }
};

export const CombineOrderReview = {
  GetSingleOrderWithReviews,
};
