/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOrder } from './Order.interface';
import { OrderModel } from './Order.model';

const createOrderInDB = async (order: TOrder | unknown) => {
  const result = await OrderModel.create(order);
  return result;
};

const getAllOrdersInDB = async (
  filter: any,
  sort: any,
  page: number,
  limit: number,
) => {
  const skip = (page - 1) * limit;

  const query = OrderModel.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await OrderModel.countDocuments(filter);

  const result = await query.exec();

  return { data: result, total };
};

const getSingleOrderInDB = async (id: string) => {
  const result = await OrderModel.findById(id).lean();
  return result;
};

const updateOrderInDB = async (id: string, data: Partial<TOrder>) => {
  try {
    console.log(data);
    // Extract the tags and other update data from the incoming data
    const { tags, details, ...updateData } = data;

    // Fetch the existing order
    const existingOrder = await OrderModel.findById(id);

    // If the order doesn't exist, throw an error or handle it appropriately
    if (!existingOrder) {
      throw new Error('Order not found');
    }

    // Ensure tags is always an array
    if (!existingOrder.tags) {
      existingOrder.tags = [];
    }

    // Update the tags based on the incoming data
    if (tags && Array.isArray(tags)) {
      tags.forEach((newTag) => {
        const existingTagIndex = existingOrder.tags.findIndex(
          (tag) => tag.name === newTag.name,
        );

        if (existingTagIndex !== -1) {
          // Update the existing tag if it exists
          existingOrder.tags[existingTagIndex] = newTag;
        } else if (!newTag.isDeleted) {
          // Add the new tag if it doesn't exist and is not marked as deleted
          existingOrder.tags.push(newTag);
        }
      });

      // Remove tags marked as deleted
      existingOrder.tags = existingOrder.tags.filter((tag) => !tag.isDeleted);
    }

    if (details) {
      existingOrder.details = details;
    }

    // Update other fields as needed
    Object.assign(existingOrder, updateData);

    // Save the updated order
    const result = await existingOrder.save();

    return result;
  } catch (error) {
    console.error('Error in updateOrderInDB:', error);
    throw error; // Re-throw the error to be caught by the controller
  }
};

const deleteOneInDB = async (id: string) => {
  const result = await OrderModel.findByIdAndDelete(id, { new: true });
  return result;
};

const getBestOrderInDB = async () => {
  const bestOrder = await OrderModel.findOne()
    .sort('-phone')
    .select(
      '_id email name categoryId price tags startDate endDate userID doneBy durationInDays details phone address',
    )
    .lean();
  return bestOrder;
};

export const OrderServices = {
  createOrderInDB,
  getAllOrdersInDB,
  getSingleOrderInDB,
  updateOrderInDB,
  deleteOneInDB,
  getBestOrderInDB,
};
