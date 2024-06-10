import { TProduct } from './Product.interface';
import { ProductModel } from './Product.model';

const CreateProductInDB = async (data: TProduct) => {
  const result = await ProductModel.create(data);
  return result;
};
const UpdateProductInDB = async (data: Partial<TProduct>, id: string) => {
  const result = await ProductModel.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const GetAllProducts = async () => {
  const result = await ProductModel.find();
  return result;
};
const GetSingleProducts = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

export const ProductServices = {
  CreateProductInDB,
  UpdateProductInDB,
  GetAllProducts,
  GetSingleProducts,
};
