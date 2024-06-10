import { TUser } from './User.interface';
import { UserModel } from './User.model';

const CreateUserInDB = async (data: TUser) => {
  const result = await UserModel.create(data);
  return result;
};
const UpdateUserInDB = async (data: Partial<TUser>, id: string) => {
  const result = await UserModel.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const GetAllUsers = async () => {
  const result = await UserModel.find();
  return result;
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
