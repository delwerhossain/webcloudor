import { TCategory } from './Category.interface';
import { CategoryModel } from './Category.model';

const CreateCategoryInDB = async (data: TCategory) => {
  const result = await CategoryModel.create(data);
  return result;
};
const UpdateCategoryInDB = async (data: Partial<TCategory>, id: string) => {
  const result = await CategoryModel.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const GetAllCategories = async () => {
  const result = await CategoryModel.find();
  return result;
};
const GetSingleCategories = async (id: string) => {
  const result = await CategoryModel.findById(id);
  return result;
};

export const CategoryServices = {
  CreateCategoryInDB,
  UpdateCategoryInDB,
  GetAllCategories,
  GetSingleCategories,
};
