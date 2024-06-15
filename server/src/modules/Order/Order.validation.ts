import { z } from 'zod';
import { Types } from 'mongoose';

// Helper function to validate ObjectId
const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

const objectIdValidation = z.string().refine(isValidObjectId, {
  message: "Invalid ObjectId format",
});

// Payment Details schema
const cardDetailsValidation = z.object({
  cardNumber: z.string().min(1),
  cardHolderName: z.string().min(1),
  expiryDate: z.string().min(1),
}).optional();

const mobileWalletDetailsValidation = z.object({
  walletNumber: z.string().min(1),
  transactionId: z.string().min(1),
}).optional();

const bankDetailsValidation = z.object({
  accountNumber: z.string().min(1),
  bankName: z.string().min(1),
  accountHolderName: z.string().min(1),
}).optional();

const sslCommerzDetailsValidation = z.object({
  transactionId: z.string().min(1),
}).optional();

const paymentDetailsValidation = z.object({
  paymentType: z.enum(['Cash', 'Card', 'Bkash', 'Rocket', 'Nagad', 'Upay', 'Bank', 'SSLCOMMERZ']),
  cardDetails: cardDetailsValidation,
  mobileWalletDetails: mobileWalletDetailsValidation,
  bankDetails: bankDetailsValidation,
  sslCommerzDetails: sslCommerzDetailsValidation,
  amount: z.number().min(0),
  date: z.date().default(new Date()),
  status: z.enum(['Pending', 'Success', 'Failed']).default('Pending'),
});

// Address schema
export const addressValidation = z.object({
  street: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  postalCode: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
});

// Order Item schema
const orderItemValidation = z.object({
  productId: objectIdValidation,
  quantity: z.number().min(1),
  price: z.number().min(0),
});

// Main Order schema
const orderValidation = z.object({
  totalPrice: z.number().min(0),
  orderDate: z.date().default(new Date()),
  deliveryDate: z.date().optional(),
  userID: objectIdValidation.optional(),
  doneBy: z.string().trim().min(1).optional(),
  durationInDays: z.number().optional(),
  description: z.string().optional(),
  paymentDetails: z.array(paymentDetailsValidation),
  orderItems: z.array(orderItemValidation),
  totalAmount: z.number().min(0),
  shippingAddress: addressValidation.optional(),
  billingAddress: addressValidation.optional(),
  status: z.enum(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']),
});

const createOrderSchemaValidation = orderValidation;

const updateOrderSchemaValidation = orderValidation.partial();

export const OrderValidation = {
  createOrderSchemaValidation,
  updateOrderSchemaValidation,
};
