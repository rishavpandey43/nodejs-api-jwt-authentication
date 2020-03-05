// VALIDATION
const Joi = require("@hapi/joi");

// Register validation schema
const registerValidation = data => {
  // schema for register validation
  const registerValidationSchema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(8)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required()
  });

  return registerValidationSchema.validate(data);
};

const loginValidation = data => {
  // schema for login validation
  const loginValidationSchema = Joi.object({
    email: Joi.string()
      .min(8)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required()
  });

  return loginValidationSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
