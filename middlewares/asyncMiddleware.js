export const asyncMiddleware = handlerFn => (req, res, next) =>
    Promise
    .resolve(handlerFn(req, res, next))
    .catch(next)