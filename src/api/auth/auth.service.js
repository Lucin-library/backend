import prisma from "../../config/prisma.instance.js";
import { AuthenticationErrorHandler } from "../../error/AuthenticationError.js";
import { DataBaseErrorHandler } from "../../error/DataBaseError.js";

const login = async (email, password) => {
  try {
    const user = await prisma.user_account.findUniqueOrThrow({
      where: {
        email: email,
        password: password,
      },
    });
    if (user != null) {
      return user;
    }
  } catch (err) {
    throw new AuthenticationErrorHandler.PasswordError(`Error password`);
  }
};

const register = async (user) => {
  const userInfo = await prisma.user_account.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!userInfo) {
    const userParameter = {
      email: user.email,
      password: user.password,
      full_name: user.full_name,
      birthDate: new Date(user.birth_day),
      gender: user.gender,
      contactInfo: user.phone_number,
    };

    try {
      const newUser = await prisma.user_account.create({
        data: userParameter,
      });
      return Promise.resolve(newUser);
    } catch (err) {
      throw new DataBaseErrorHandler.CannotCreate(
        `${user.email} already exits`
      );
    }
  } else {
    throw new DataBaseErrorHandler.UserAlreadyExits({ entity: user.email });
  }
};

export const Service = {
  login,
  register,
};
