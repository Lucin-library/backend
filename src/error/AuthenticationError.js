class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

class PasswordError extends AuthenticationError {
  constructor(entity) {
    super(`${entity}`);
    this.name = this.constructor.name;
    this.entity = entity;
  }
}

export const AuthenticationErrorHandler = {
  PasswordError,
};
