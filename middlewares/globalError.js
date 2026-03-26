export const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: "failed",
    error: err.message || "Something went wrong",
  });
};
