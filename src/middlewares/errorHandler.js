module.exports = (err, req, res, next) => {
  console.error(err);


  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors?.map(e => ({ field: e.path, message: e.message })),
    });
  }

  res.status(500).json({ message: "Internal server error" });
};
