import { Document, Types } from 'mongoose';

export interface ICardDetails {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
}

export interface IMobileWalletDetails {
  walletNumber: string;
  transactionId: string;
}

export interface IBankDetails {
  accountNumber: string;
  bankName: string;
  accountHolderName: string;
}

export interface ISSLCOMMERZDetails {
  transactionId: string;
}

export interface IPaymentDetails {
  paymentType: 'Cash' | 'Card' | 'Bkash' | 'Rocket' | 'Nagad' | 'Upay' | 'Bank' | 'SSLCOMMERZ';
  cardDetails?: ICardDetails;
  mobileWalletDetails?: IMobileWalletDetails;
  bankDetails?: IBankDetails;
  sslCommerzDetails?: ISSLCOMMERZDetails;
  amount: number;
  date: Date;
  status: 'Pending' | 'Success' | 'Failed';
}

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface TOrder extends Document {  
  totalPrice: number;
  userID: Types.ObjectId;
  doneBy?: string;
  paymentDetails: IPaymentDetails[];
  durationInDays?: number;
  description?: string;
  orderItems: IOrderItem[];
  totalAmount: number;
  shippingAddress?: IAddress;
  billingAddress?: IAddress;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: Date;
  deliveryDate?: Date;
}
