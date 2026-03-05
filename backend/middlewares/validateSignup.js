import { body, validationResult } from "express-validator";

export const validateSignup = [

  // email
  body("email")
    .trim()
    .isEmail().withMessage("Invalid email address")
    .normalizeEmail(),

  // phone number (any country)
  body("phone")
  .matches(/^\+[1-9]\d{1,14}$/)
  .withMessage("Phone number must be in international format (e.g. +254712345678)"),

  // role
  body("role")
    .trim()
    .isIn(["user", "driver", "admin"])
    .withMessage("Role must be user, driver, or admin"),

  // password
  body("password")
  .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
  .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter")
  .matches(/[a-z]/).withMessage("Password must contain a lowercase letter")
  .matches(/[0-9]/).withMessage("Password must contain a number")
  .matches(/[!@#$%^&*(),.?":{}|<>]/)
  .withMessage("Password must contain a special character"),

  // confirm password
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  // handle errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map(err => err.msg),
      });
    }
    next();
  },
];