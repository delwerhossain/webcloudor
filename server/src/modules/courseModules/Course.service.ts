/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCourse } from './Course.interface';
import { CourseModel } from './Course.model';

const createCourseInDB = async (course: TCourse | unknown) => {
  const result = await CourseModel.create(course);
  return result;
};
const getALlCoursesInDB = async (
  filter: any,
  sort: any,
  page: number,
  limit: number,
) => {
  const skip = (page - 1) * limit;

  const query = CourseModel.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await CourseModel.countDocuments(filter);

  const result = await query.exec();

  return { data: result, total };
};

const getSingleCourseInDB = async (id: string) => {
  const result = await CourseModel.findById(id).lean();
  return result;
};

const updateCourseInDB = async (id: string, data: Partial<TCourse>) => {
  try {
    console.log(data);
    // Extract the tags and other update data from the incoming data
    const { tags, details, ...updateData } = data;

    // Fetch the existing course
    const existingCourse = await CourseModel.findById(id);

    // If the course doesn't exist, throw an error or handle it appropriately
    if (!existingCourse) {
      throw new Error('Course not found');
    }

    // Update the tags based on the incoming data
    if (tags && Array.isArray(tags)) {
      tags.forEach((newTag) => {
        const existingTagIndex = existingCourse.tags.findIndex(
          (tag) => tag.name === newTag.name,
        );

        if (existingTagIndex !== -1) {
          // Update the existing tag if it exists
          existingCourse.tags[existingTagIndex] = newTag;
        } else if (!newTag.isDeleted) {
          // Add the new tag if it doesn't exist and is not marked as deleted
          existingCourse.tags.push(newTag);
        }
      });

      // Remove tags marked as deleted
      existingCourse.tags = existingCourse.tags.filter((tag) => !tag.isDeleted);
    }

    if (details) {
      existingCourse.details = { ...existingCourse.details, ...details };
    }

    // Update other fields as needed
    Object.assign(existingCourse, updateData);

    // Save the updated course
    const result = await existingCourse.save();

    return result;
  } catch (error) {
    console.error('Error in updateCourseInDB:', error);
    throw error; // Re-throw the error to be caught by the controller
  }
};

const DeleteOneInDB = async (id: string) => {
  const result = await CourseModel.findByIdAndDelete(id, { new: true });
  return result;
};

const getBestCourseInDB = async () => {
  const bestCourse = await CourseModel.findOne()
    .sort('-averageRating')
    .select(
      '_id title instructor categoryId price tags startDate endDate language provider durationInWeeks details averageRating reviewCount',
    )
    .lean();
  return bestCourse;
};
export const CourseServices = {
  createCourseInDB,
  getALlCoursesInDB,
  getSingleCourseInDB,
  updateCourseInDB,
  DeleteOneInDB,
  getBestCourseInDB,
};
