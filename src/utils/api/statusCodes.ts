type StatusCode = {
  OK: number;
  CREATED: number;
  NOT_FOUND: number;
  INTERNAL_SERVER_ERROR: number;
  METHOD_NOT_ALLOWED: number;
};

const statusCode: StatusCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  METHOD_NOT_ALLOWED: 405
};

export default statusCode;
