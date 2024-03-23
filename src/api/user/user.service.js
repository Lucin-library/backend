// import { User } from "./user.model.js";

const login = async (user) => {
  try {
    console.log(user);
    return "user";
  } catch (err) {
    throw new Error("Can't login");
  }
};
export const Service = {
  login: login,
};
