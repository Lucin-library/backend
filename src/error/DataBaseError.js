class DataBaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DataBase error";
    this.statusCode = 500;
  }
}

class CannotCreate extends DataBaseError {
  constructor(entity) {
    super(`Can not create ${entity}`);
    this.name = this.constructor.name;
    this.entity = entity;
  }
}

class UserAlreadyExits extends DataBaseError {
  constructor(entity) {
    super(entity);
    this.name = this.constructor.name;
    this.entity = entity;
  }
}

class CannotUpdate extends DataBaseError {
  constructor(entity) {
    super(`Can not update ${entity}`);
    this.name = this.constructor.name;
    this.entity = entity;
  }
}

export const DataBaseErrorHandler = {
  CannotCreate,
  UserAlreadyExits,
  CannotUpdate,
};
