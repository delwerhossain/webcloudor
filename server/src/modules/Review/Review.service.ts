import { Types } from 'mongoose';
import { TReview } from './Review.interface';
import { ReviewModel } from './Review.model';
import { OrderModel } from '../Order/Order.model';

const CreateReviewInDB = async (data: TReview) => {
  const result = await ReviewModel.create(data);
  // Update order's average rating and review count using aggregation
  const orderId = new Types.ObjectId(data.orderId);
  const [orderStats] = await ReviewModel.aggregate([
    {
      $match: { orderId },
    },
    {
      $group: {
        _id: null,
        totalRating: { $sum: '$rating' },
        address: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        phone: { $divide: ['$totalRating', '$address'] },
        address: 1,
      },
    },
  ]);

  await OrderModel.findByIdAndUpdate(orderId, {
    phone: orderStats?.phone || 0,
    address: orderStats?.address || 0,
  });

  return result;
};

const GetallReviewsInDB = async () => {
  const result = await ReviewModel.find();
  return result;
};
const GetallReviewsForAsingleUserInDB = async (id: string) => {
  const result = await ReviewModel.find({
    orderId: { $eq: id },
  });

  return result;
};
export const ReviewServices = {
  CreateReviewInDB,
  GetallReviewsInDB,
  GetallReviewsForAsingleUserInDB,
};
