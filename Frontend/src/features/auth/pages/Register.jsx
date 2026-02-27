import React, { useState } from "react";
import { useRegisterUserMutation } from "../redux/authApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { registerSchema } from "../validators/registerSchema";
import { useRoleRedirect } from "../../../hooks/useRoleRedirect";

// Enterprise components

import FormInput from "../../../components/FormInputs/FormInput";
import PasswordInput from "../../../components/FormInputs/PasswordInput";
import FormButton from "../../../components/Buttons/FormButton";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import RedirectLink from "../../../components/Layouts/RedirectLink";

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  useRoleRedirect(navigate);

  const formik = useFormik({
    initialValues: {
      phone_number: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          phone_number: values.phone_number,
          password: values.password,
        };
        await registerUser(payload).unwrap();
        toast.success("Registered successfully!");
        resetForm();
        navigate("/login");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to register. Please try again.");
      }
    },
  });

  // Local state for showing/hiding password (can also be handled inside PasswordInput)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <AuthLayout title="Create Account">
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-6 sm:space-y-8 mt-6 sm:mt-8 md:mt-10"
      >
        {/* Phone Number */}
        <FormInput
          name="phone_number"
          label="Phone Number"
          placeholder="Enter your phone number"
          formik={formik}
        />

        {/* Password */}
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          formik={formik}
        />

        {/* Confirm Password */}
        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          formik={formik}
        />

        {/* Submit Button */}
        <FormButton isLoading={isLoading}>Register</FormButton>
      </form>

      <RedirectLink
        text="Already have an account?"
        redirectText="Login"
        onClick={() => navigate("/login")}
        sx={{ mt: 3 }} // spacing from the form
      />
    </AuthLayout>
  );
};

export default Register;
