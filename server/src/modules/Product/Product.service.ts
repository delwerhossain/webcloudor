/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProduct } from './Product.interface';
import { ProductModel } from './Product.model';

const CreateProductInDB = async (data: TProduct) => {
  const result = await ProductModel.create(data);
  return result;
};
const UpdateProductInDB = async (data: Partial<TProduct>, id: string) => {
  try {
    const { ...updateData } = data;
    // Fetch the existing order
    const existingProduct = await ProductModel.findById(id);

    // If the order doesn't exist, throw an error or handle it appropriately
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    // Update other fields as needed & existingOrder is now updated
    Object.assign(existingProduct, updateData);

    // Save the updated Product
    const result = await existingProduct.save();

    return result;
  } catch (error) {
    console.error('Error in updateProductInDB:', error);
    throw error; // Re-throw the error to be caught by the controller
  }
};
// const result = await ProductModel.findByIdAndUpdate(id, data, { new: true });
// return result;

const GetAllProducts = async (
  filter: any,
  sort: any,
  page: number,
  limit: number,
) => {
  const skip = (page - 1) * limit;

  const query = ProductModel.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await ProductModel.countDocuments(filter);

  const result = await query.exec();

  return { data: result, total };
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
