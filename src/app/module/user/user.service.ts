import { TUser } from "./user.interface";
import { User } from "./user.model";

const getSingleRoomsFromDb = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateUserInDb = async (id: string, payload: Partial<TUser>) => {
  const data = await User.findById(id);
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  getSingleRoomsFromDb,
  updateUserInDb,
};
