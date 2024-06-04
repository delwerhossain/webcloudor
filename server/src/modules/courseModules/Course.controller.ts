import { NextFunction, Request, Response } from 'express';
import { CourseValidation } from './Course.validation';
import { CourseServices } from './Course.service';

const CreateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const course = req.body;
    const ZodValidation =
      CourseValidation.createCourseSchemaValidation.parse(course);
    const startDate = new Date(ZodValidation.startDate);
    const endDate = new Date(ZodValidation.endDate);
    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
    const durationInWeeks = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / millisecondsInWeek,
    );

    ZodValidation.durationInWeeks = durationInWeeks;
    const result = await CourseServices.createCourseInDB(ZodValidation);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: 'Course created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const GetallCourse = async (
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
      tags,
      startDate,
      endDate,
      language,
      provider,
      durationInWeeks,
      level,
    } = req.query;

    const pageNumber = Array.isArray(page)
      ? parseInt(page[0] as string)
      : parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const filter: any = {};
    if (minPrice) filter.price = { $gte: parseFloat(minPrice as string) };
    if (maxPrice)
      filter.price = { ...filter.price, $lte: parseFloat(maxPrice as string) };
    if (tags) filter['tags.name'] = tags;
    if (startDate) filter.startDate = { $gte: new Date(startDate as string) };
    if (endDate) filter.endDate = { $lte: new Date(endDate as string) };
    if (language) filter.language = language;
    if (provider) filter.provider = provider;
    if (durationInWeeks)
      filter.durationInWeeks = parseInt(durationInWeeks as string);
    if (level) filter['details.level'] = level;

    const sort: any = {};
    if (sortBy) sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const result = await CourseServices.getALlCoursesInDB(
      filter,
      sort,
      pageNumber,
      limitNumber,
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Course and Reviews retrieved successfully',
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

const GetSingleCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.params;
    const result = await CourseServices.getSingleCourseInDB(courseId);
    if (result) {
      res.status(200).json({
        success: true,
        statusCode: 201,
        message: 'Course retrieved successfully',
        data: result,
      });
    }
  } catch (err) {
    next(err);
  }
};

const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.params;
    const result = await CourseServices.DeleteOneInDB(courseId);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: 'Course delete successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.params;
    const data = req.body;
    console.log({data});

    // Validate and parse the incoming data using Zod or your validation method
    const zodData = CourseValidation.updateCourseSchemaValidation.parse(data);

    // Call the service function to update the course
    const result = await CourseServices.updateCourseInDB(courseId, zodData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Course updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const GetBestReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bestCourse = await CourseServices.getBestCourseInDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Best course retrieved successfully',
      data: {
        course: {
          _id: bestCourse?._id,
          title: bestCourse?.title,
          instructor: bestCourse?.instructor,
          categoryId: bestCourse?.categoryId,
          price: bestCourse?.price,
          tags: bestCourse?.tags,
          startDate: bestCourse?.startDate,
          endDate: bestCourse?.endDate,
          language: bestCourse?.language,
          provider: bestCourse?.provider,
          durationInWeeks: bestCourse?.durationInWeeks,
          details: bestCourse?.details,
        },
        averageRating: bestCourse?.averageRating,
        reviewCount: bestCourse?.reviewCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const CourseControllers = {
  CreateCourse,
  GetallCourse,
  GetSingleCourse,
  updateCourse,
  deleteCourse,
  GetBestReview,
};
