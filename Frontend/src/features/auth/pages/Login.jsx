import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";
import { useLoginUserMutation } from "../redux/authApiSlice";
import { loginSchema } from "../validators/loginSchema";
import { useRoleRedirect } from "../../../hooks/useRoleRedirect";

// Enterprise form components
import FormInput from "../../../components/FormInputs/FormInput";
import PasswordInput from "../../../components/FormInputs/PasswordInput";
import FormButton from "../../../components/Buttons/FormButton";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import RedirectLink from "../../../components/Layouts/RedirectLink";

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect if user already logged in
  useRoleRedirect(navigate);

  const formik = useFormik({
    initialValues: {
      phone_number: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const userData = await loginUser(values).unwrap();
        // dispatch(setCredentials(userData));
        toast.success("Login successful!");
        resetForm();
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || "Login failed. Please try again.");
      }
    },
  });

  return (
<AuthLayout title="Welcome Back">
  <form onSubmit={formik.handleSubmit} className="space-y-6 sm:space-y-8 mt-6 sm:mt-8 md:mt-10">
    <FormInput name="phone_number" label="Phone Number" placeholder="Enter your phone number" formik={formik} />
    <PasswordInput name="password" label="Password" placeholder="Enter your password" formik={formik} />
    <FormButton isLoading={isLoading}>Login</FormButton>
  </form>

  <RedirectLink
    text="Don't have an account?"
    text2="Forgot Password?"
    redirectText="Register"
    redirectText2="Forgot Password"
    onClick={() => navigate("/register")}
    onClick2={() => navigate("/forgot-password")}
    sx={{ mt: 5 }} // pushes it 4 spacing units
  />
</AuthLayout>
  );
};

export default Login;
