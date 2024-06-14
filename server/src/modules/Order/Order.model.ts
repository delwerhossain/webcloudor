import { Schema, model } from 'mongoose';
import {
  TOrder,
  IPaymentDetails,
  IAddress,
  IOrderItem,
} from './Order.interface';

// Define the PaymentDetails sub-schema
const PaymentDetailsSchema = new Schema<IPaymentDetails>({
  paymentType: {
    type: String,
    enum: [
      'Cash',
      'Card',
      'Bkash',
      'Rocket',
      'Nagad',
      'Upay',
      'Bank',
      'SSLCOMMERZ',
    ],
    required: true,
  },
  cardDetails: {
    cardNumber: {
      type: String,
      required: function () {
        return this.paymentType === 'Card';
      },
    },
    cardHolderName: {
      type: String,
      required: function () {
        return this.paymentType === 'Card';
      },
    },
    expiryDate: {
      type: String,
      required: function () {
        return this.paymentType === 'Card';
      },
    },
  },
  mobileWalletDetails: {
    walletNumber: {
      type: String,
      required: function () {
        return ['Bkash', 'Rocket', 'Nagad', 'Upay'].includes(this.paymentType);
      },
    },
    transactionId: {
      type: String,
      required: function () {
        return ['Bkash', 'Rocket', 'Nagad', 'Upay'].includes(this.paymentType);
      },
    },
  },
  bankDetails: {
    accountNumber: {
      type: String,
      required: function () {
        return this.paymentType === 'Bank';
      },
    },
    bankName: {
      type: String,
      required: function () {
        return this.paymentType === 'Bank';
      },
    },
    accountHolderName: {
      type: String,
      required: function () {
        return this.paymentType === 'Bank';
      },
    },
  },
  sslCommerzDetails: {
    transactionId: {
      type: String,
      required: function () {
        return this.paymentType === 'SSLCOMMERZ';
      },
    },
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Success', 'Failed'],
    default: 'Pending',
  },
});

// Define the Address sub-schema
export const AddressSchema = new Schema<IAddress>({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
});

// Define the OrderItem sub-schema
const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

// Define the main Order schema
const orderSchema = new Schema<TOrder>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalPrice: { type: Number, required: [true, 'Price is required'] },
    doneBy: {
      type: String,
      trim: true,
    },
    paymentDetails: [PaymentDetailsSchema],
    durationInDays: {
      type: Number,
    },
    description: { type: String, trim: true },
    orderItems: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date },
  },
  { timestamps: true },
);

export const OrderModel = model<TOrder>('Order', orderSchema);
