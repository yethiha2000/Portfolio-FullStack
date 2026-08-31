export function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  const status = error.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "An unexpected server error occurred."
      : error.message || "Internal server error.";

  res.status(status).json({
    success: false,
    message,
  });
}
