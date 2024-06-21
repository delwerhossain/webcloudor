import { Schema, model } from 'mongoose';
import { TCategory } from './Category.interface';

const CategorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Category Name Required'],
    },
  },
  { timestamps: true },
);

export const CategoryModel = model<TCategory>('category', CategorySchema);
