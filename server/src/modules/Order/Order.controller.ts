/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { OrderValidation } from './Order.validation';
import { OrderServices } from './Order.service';


const CreateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order = req.body;
    const ZodValidation =
      OrderValidation.createOrderSchemaValidation.parse(order);
      //! todo need to fix date time count
    const startDate = new Date(ZodValidation.startDate);
    const endDate = new Date(ZodValidation.endDate);
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const durationInDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / millisecondsInDay,
    );

    ZodValidation.durationInDays = durationInDays;
    const result = await OrderServices.createOrderInDB(ZodValidation);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: 'Order created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


const GetAllOrder = async (
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
      startDate,
      endDate,
      userID,
      doneBy,
      durationInDays,
      productName, // new
      categoryId,  // new
    } = req.query;

    const pageNumber = Array.isArray(page) ? parseInt(page[0] as string, 10) : parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const filter: any = {};
    if (minPrice) filter.price = { $gte: parseFloat(minPrice as string) };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseFloat(maxPrice as string) };
    if (startDate) filter.startDate = { $gte: new Date(startDate as string) };
    if (endDate) filter.endDate = { $lte: new Date(endDate as string) };
    if (userID) filter.userID = userID;
    if (doneBy) filter.doneBy = doneBy;
    if (durationInDays) filter.durationInDays = parseInt(durationInDays as string, 10);
    if (productName) filter.productName = { $regex: new RegExp(productName as string, 'i') };
    if (categoryId) filter.categoryId = categoryId;

    const sort: any = {};
    if (sortBy) sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const result = await OrderServices.getAllOrdersInDB(filter, sort, pageNumber, limitNumber);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Orders retrieved successfully',
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



const GetSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.getSingleOrderInDB(orderId);
    if (result) {
      res.status(200).json({
        success: true,
        statusCode: 201,
        message: 'Order retrieved successfully',
        data: result,
      });
    }
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.deleteOneInDB(orderId);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: 'Order delete successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.params;
    const data = req.body;
    // Validate and parse the incoming data using Zod or your validation method
    const zodData = OrderValidation.updateOrderSchemaValidation.parse(data);

    // Call the service function to update the order
    const result = await OrderServices.updateOrderInDB(orderId, zodData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Order updated successfully',
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
    const bestOrder = await OrderServices.getBestOrderInDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Best order retrieved successfully',
      data: {
        order: {
          _id: bestOrder?._id,
          productName: bestOrder?.productName,
          categoryId: bestOrder?.categoryId,
          price: bestOrder?.price,
          startDate: bestOrder?.startDate,
          endDate: bestOrder?.endDate,
          userID: bestOrder?.userID,
          doneBy: bestOrder?.doneBy,
          durationInDays: bestOrder?.durationInDays,
          description: bestOrder?.description,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const OrderControllers = {
  CreateOrder,
  GetAllOrder,
  GetSingleOrder,
  updateOrder,
  deleteOrder,
  GetBestReview,
};
