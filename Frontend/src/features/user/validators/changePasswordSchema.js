// src/features/user/validators/changePasswordSchema.js
import * as Yup from "yup";

export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string()
    .required("Current password is required"),

  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm password is required"),
});
