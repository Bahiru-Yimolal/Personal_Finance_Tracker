import { useFormik } from "formik";
import { toast } from "react-toastify";
import { forgotPasswordSchema } from "../validators/forgotPasswordSchema";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import FormInput from "../../../components/FormInputs/FormInput";
import FormButton from "../../../components/Buttons/FormButton";
import { useForgotPasswordMutation } from "../redux/authApiSlice";
import RedirectLink from "../../../components/Layouts/RedirectLink";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
 
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await forgotPassword(values).unwrap();
        toast.success("Password reset link sent to your email");
        resetForm();
        navigate("/login");
      } catch (error) {
        toast.error(error?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive a reset link"
      paperClassName="min-h-[250px] max-w-sm"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          formik={formik}
        />

        <FormButton
          isLoading={isLoading}
        >Send Reset Link</FormButton>
      </form>
    <RedirectLink
        text="Remember your password?"
        redirectText="Login"
        onClick={() => navigate("/login")}
        sx={{ mt: 5 }} // pushes it 4 spacing units
    />
    </AuthLayout>
  );
};

export default ForgotPassword;
