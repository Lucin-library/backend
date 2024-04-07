import prisma from "../../config/prisma.instance.js";
import { AuthenticationErrorHandler } from "../../error/AuthenticationError.js";
import { DataBaseErrorHandler } from "../../error/DataBaseError.js";

const login = async (email, password) => {
  try {
    const user = await prisma.userAccount.findUniqueOrThrow({
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
  const userInfo = await prisma.userAccount.findUnique({
    where: {
      email: user.email,
    },
  });

  if (userInfo == null) {
    const userParameter = {
      email: user.email,
      password: user.password,
      fullName: user.fullName,
      birthDate: new Date(user.dayOfBirth),
      gender: user.gender,
      contactInfo: user.phoneNumber,
    };

    try {
      const newUser = await prisma.userAccount.create({
        data: userParameter,
      });
      return Promise.resolve(newUser);
    } catch (err) {
      throw new DataBaseErrorHandler.CannotCreate("user");
    }
  } else {
    throw new DataBaseErrorHandler.UserAlreadyExits({ entity: user.email });
  }
};

export const Service = {
  login,
  register,
};
