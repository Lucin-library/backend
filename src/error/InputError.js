class InputError extends Error {
  constructor(message) {
    super(message);
    this.name = "Input Error";
    this.statusCode = 500;
  }
}

class Validate extends InputError {
  constructor(entity) {
    super(entity);
    this.name = this.constructor.name;
    this.entity = entity;
  }
}

export const InputErrorHandler = {
  Validate,
};
