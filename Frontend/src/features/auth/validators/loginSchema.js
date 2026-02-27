// src/features/auth/validators/loginSchema.js
import * as Yup from 'yup';

export const loginSchema = Yup.object({
  phone_number: Yup.string()
    .required("Phone number is required"),
  password: Yup.string()
    .required("Password is required"),
});
