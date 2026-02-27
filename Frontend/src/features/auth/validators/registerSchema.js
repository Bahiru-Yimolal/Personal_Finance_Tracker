import * as Yup from "yup";

export const registerSchema = Yup.object({
  phone_number: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number is too short"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 6 characters"),
    
  confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
});
