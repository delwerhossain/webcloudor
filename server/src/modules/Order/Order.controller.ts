/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { OrderValidation } from './Order.validation';
import { OrderServices } from './Order.service';
import { UserModel } from '../User/User.model';
import { UserValidation } from '../User/User.validation';
import mongoose from 'mongoose';
import { UserServices } from '../User/User.service';

//! CreateOrderAndUser will create both user and order, more work needed to be done
const CreateOrderAndUser = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const {  userData ,billingAddress,paymentDetails,  orderItems    } = req.body;
    const rowUserData = {
      name : userData.name,
      email : userData.email,
      phoneNumber : userData.phoneNumber,
      address : billingAddress
    };  

    const rowOrderData = {
      billingAddress,paymentDetails,  orderDate,orderItems 
    }

    // Validate user data
    const validatedUser = UserValidation.userValidation.parse(rowUserData);

    // Check if user already exists
    let user = await UserModel.findOne({
      $or: [{ email: validatedUser.email }, { phoneNumber: validatedUser.phoneNumber }],
    }).session(session);

    // If user doesn't exist, create a new one
    if (!user) {
      user = await UserServices.CreateUserInDB(validatedUser, session);
    }

    // Validate order data
    const validatedOrder = OrderValidation.createOrderSchemaValidation.parse(rowOrderData);

    // Calculate durationInDays
    // const orderDate = new Date(validatedOrder.orderDate);
    // const deliveryDate = new Date(validatedOrder.deliveryDate);
    // const millisecondsInDay = 24 * 60 * 60 * 1000;
    // const durationInDays = Math.ceil((deliveryDate.getTime() - orderDate.getTime()) / millisecondsInDay);

    // validatedOrder.durationInDays = durationInDays;
    // validatedOrder.userID = user._id;

    // Create order
    const order = await OrderServices.createOrderInDB(validatedOrder, session);

    // Update user's orderDetails
    user.orderDetails.push({ orderID: order._id });
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User and order created successfully',
      data: { user, order },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};


const CreateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    const ZodValidation =
      OrderValidation.createOrderSchemaValidation.parse(order);
    //! todo need to fix date time count
    const orderDate = new Date(ZodValidation.orderDate);
    const deliveryDate = new Date(ZodValidation.deliveryDate);
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const durationInDays = Math.ceil(
      (deliveryDate.getTime() - orderDate.getTime()) / millisecondsInDay,
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

const GetAllOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = '1',
      limit = '10',
      sortBy,
      sortOrder,
      minPrice,
      maxPrice,
      orderDate,
      deliveryDate,
      userID,
      doneBy,
      durationInDays,
      productName, // new
      categoryId, // new
    } = req.query;

    const pageNumber = Array.isArray(page)
      ? parseInt(page[0] as string, 10)
      : parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const filter: any = {};
    if (minPrice) filter.price = { $gte: parseFloat(minPrice as string) };
    if (maxPrice)
      filter.price = { ...filter.price, $lte: parseFloat(maxPrice as string) };
    if (orderDate) filter.orderDate = { $gte: new Date(orderDate as string) };
    if (deliveryDate) filter.deliveryDate = { $lte: new Date(deliveryDate as string) };
    if (userID) filter.userID = userID;
    if (doneBy) filter.doneBy = doneBy;
    if (durationInDays)
      filter.durationInDays = parseInt(durationInDays as string, 10);
    if (productName)
      filter.productName = { $regex: new RegExp(productName as string, 'i') };
    if (categoryId) filter.categoryId = categoryId;

    const sort: any = {};
    if (sortBy) sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const result = await OrderServices.getAllOrdersInDB(
      filter,
      sort,
      pageNumber,
      limitNumber,
    );

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
    const { orderID } = req.params;
    const result = await OrderServices.getSingleOrderInDB(orderID);
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

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderID } = req.params;
    const result = await OrderServices.deleteOneInDB(orderID);
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

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderID } = req.params;
    const data = req.body;
    // Validate and parse the incoming data using Zod or your validation method
    const zodData = OrderValidation.updateOrderSchemaValidation.parse(data);

    // Call the service function to update the order
    const result = await OrderServices.updateOrderInDB(orderID, zodData);

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
          orderDate: bestOrder?.orderDate,
          deliveryDate: bestOrder?.deliveryDate,
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
  CreateOrderAndUser,
  CreateOrder,
  GetAllOrder,
  GetSingleOrder,
  updateOrder,
  deleteOrder,
  GetBestReview,
};
