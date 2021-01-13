const status = {
  //  Success
  created: 201,
  ok: 200,
  accepted: 202,

  // Failure
  badRequest: 400,
  unAuthorized: 401,
  notfound: 404,
  forbidden: 403,
  notAcceptable: 406,

  // Server Error
  internalServerErr: 500,
};

export default status;
