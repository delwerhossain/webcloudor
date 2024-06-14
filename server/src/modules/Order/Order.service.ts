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
    // Extract other update data from the incoming data
    const {...updateData } = data;

    // Fetch the existing order
    const existingOrder = await OrderModel.findById(id);

    // If the order doesn't exist, throw an error or handle it appropriately
    if (!existingOrder) {
      throw new Error('Order not found');
    }

    // Update other fields as needed & existingOrder is now updated
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
      '_id email name categoryId price orderDate deliveryDate userID doneBy durationInDays description phone address',
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
