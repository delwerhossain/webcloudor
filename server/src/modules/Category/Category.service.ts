/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCategory } from './Category.interface';
import { CategoryModel } from './Category.model';

const CreateCategoryInDB = async (data: TCategory) => {
  const result = await CategoryModel.create(data);
  return result;
};
const UpdateCategoryInDB = async (id: string, data: Partial<TCategory>) => {
  try {
    // Extract other update data from the incoming data
    const { ...updateData } = data;

    // Fetch the existing category
    const existingCategory = await CategoryModel.findById(id);

    // If the category doesn't exist, throw an error or handle it appropriately
    if (!existingCategory) {
      throw new Error('Category not found');
    }

    // Update other fields as needed & existingCategory is now updated
    Object.assign(existingCategory, updateData);

    // Save the updated category
    const result = await existingCategory.save();

    return result;
  } catch (error) {
    console.error('Error in updateCategoryInDB:', error);
    throw error; // Re-throw the error to be caught by the controller
  }
};

const GetAllCategoriesInDB = async (
  filter: any,
  sort: any,
  page: number,
  limit: number,
) => {
  const skip = (page - 1) * limit;

  const query = CategoryModel.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await CategoryModel.countDocuments(filter);

  const result = await query.exec();

  return { data: result, total };
};

const GetSingleCategories = async (id: string) => {
  const result = await CategoryModel.findById(id);
  return result;
};

export const CategoryServices = {
  CreateCategoryInDB,
  UpdateCategoryInDB,
  GetAllCategoriesInDB,
  GetSingleCategories,
};
