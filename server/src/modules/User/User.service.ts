/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from './User.interface';
import { UserModel } from './User.model';

const CreateUserInDB = async (data: TUser, session: any) => {
  // console.log({ data, session });
  const result = await UserModel.create([data], { session });
  return result[0]; // Since create() returns an array, return the first element.
};

const UpdateUserInDB = async (id: string, data: Partial<TUser>) => {
  try {
    // Extract other update data from the incoming data
    const { ...updateData } = data;

    // Fetch the existing user
    const existingUser = await UserModel.findById(id);

    // If the user doesn't exist, throw an error or handle it appropriately
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Update other fields as needed & existingUser is now updated
    Object.assign(existingUser, updateData);

    // Save the updated user
    const result = await existingUser.save();

    return result;
  } catch (error) {
    console.error('Error in updateUserInDB:', error);
    throw error; // Re-throw the error to be caught by the controller
  }
};
const GetAllUsers = async (
  filter: any,
  sort: any,
  page: number,
  limit: number,
) => {
  const skip = (page - 1) * limit;

  // Prepare the query with filter, sort, pagination, and limit
  const query = UserModel.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean(); // Use .lean() to get plain JavaScript objects instead of Mongoose documents

  // Get the total count of documents that match the filter
  const total = await UserModel.countDocuments(filter);

  // Execute the query to get the data
  const result = await query.exec();

  // Return the data and the total count
  return { data: result, total };
};

const GetSingleUsers = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

export const UserServices = {
  CreateUserInDB,
  UpdateUserInDB,
  GetAllUsers,
  GetSingleUsers,
};
