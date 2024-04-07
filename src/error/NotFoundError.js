class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 404;
  }
}
class EntityNotFound extends NotFound {
  constructor(entity) {
    super(`${entity} not found...`);
    this.name = this.constructor.name;
    this.entity = entity;
  }
}

export const NotfoundHandler = {
  EntityNotFound,
};
