function validateFields(fieldNames) {
  return (req, res, next) => {
    const missingFields = fieldNames.filter((fieldName) => !req.body || !req.body[fieldName]);

    if (missingFields.length === 0) {
      next(); // All fields are present, proceed to the next middleware or route handler
    } else {
      res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }
  };
}

module.exports = validateFields;
