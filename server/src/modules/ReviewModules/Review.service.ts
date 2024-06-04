import { Types } from 'mongoose';
import { TReview } from './Review.interface';
import { ReviewModel } from './Review.model';
import { CourseModel } from '../courseModules/Course.model';

const CreateReviewInDB = async (data: TReview) => {
  const result = await ReviewModel.create(data);
  // Update course's average rating and review count using aggregation
  const courseId = new Types.ObjectId(data.courseId);
  const [courseStats] = await ReviewModel.aggregate([
    {
      $match: { courseId },
    },
    {
      $group: {
        _id: null,
        totalRating: { $sum: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        averageRating: { $divide: ['$totalRating', '$reviewCount'] },
        reviewCount: 1,
      },
    },
  ]);

  await CourseModel.findByIdAndUpdate(courseId, {
    averageRating: courseStats?.averageRating || 0,
    reviewCount: courseStats?.reviewCount || 0,
  });

  return result;
};

const GetallReviewsInDB = async () => {
  const result = await ReviewModel.find();
  return result;
};
const GetallReviewsForAsingleUserInDB = async (id: string) => {
  const result = await ReviewModel.find({
    courseId: { $eq: id },
  });

  return result;
};
export const ReviewServices = {
  CreateReviewInDB,
  GetallReviewsInDB,
  GetallReviewsForAsingleUserInDB,
};
