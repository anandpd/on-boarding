import status from "../utils/statusCodes";

export const asyncMiddleware = (handlerFn) => (req, res, next) => {
  Promise.resolve(handlerFn(req, res, next)).catch((err) => {
    return res
      .status(status.badRequest)
      .json({ error: true, message: err.message });
  });
};
