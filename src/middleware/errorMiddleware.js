const notFound = (req, res, next) => {
  const error = new Error(`NOT Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode)
    .send({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? 'Internal Server error, please try again later' : err.stack,
    })
};

module.exports = {
    notFound,
    errorHandler
};