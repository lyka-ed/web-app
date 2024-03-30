import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwentoken";
import { InvalidInput, Forbidden } from "../middlewares/app.error.handler";

// Hash password via bcrypt
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

//Compare current password with hashPassword
const comparePasswords = async (currentPassword, hash) => {
  return await bcrypt.compare(currentPassword, hash);
};

// Generate  JSON Web Token
const generateToken = (payload, expiresIn = "10m") => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

// Verify JSON Web Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    throw new InvalidInput("Invalid token", "Auth failed");
  }
};

const validate = (schema, data) => {
  if (schema) {
    const { error, vaule } = schema.validate(data);
    if (error) {
      const errorMessage = error.details[0].message;
      throw new InvalidInput(errorMessage);
    }
    return vaule;
  }
};

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
};

module.export = {
  hashPassword,
  comparePasswords,
  generateToken,
  verifyToken,
  validate,
  asyncWrapper,
};
