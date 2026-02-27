import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Paper,
  Grid,
  MenuItem,
  CircularProgress,
  Container,
  Fade,
} from "@mui/material";
import {
  AccountCircleOutlined as ProfileIcon,
} from "@mui/icons-material";
import { useTranslation } from "../../../hooks/useTranslation";
import { profileSchema } from "../validators/profileSchema";
import { useViewProfileQuery, useUpdateProfileMutation } from "../redux/userApiSlice";
import FormInput from "../../../components/FormInputs/FormInput";
import FormButton from "../../../components/Buttons/FormButton";

const Profile = () => {
  const { t } = useTranslation();
  const isDark = useSelector((state) => state.ui.theme === "dark");
  const reduxUser = useSelector((state) => state.auth.userInfo);
  const [userData, setUserData] = useState(reduxUser);

  // Fetch full profile from backend
  const { data, isLoading, isError, refetch } = useViewProfileQuery();

  useEffect(() => {
    if (data?.user) {
      setUserData(data.user);
    }
  }, [data]);

  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: userData?.username || "",
      first_name: userData?.first_name || "",
      last_name: userData?.last_name || "",
      email: userData?.email || "",
      sex: userData?.sex || "",
      date_of_birth: userData?.date_of_birth || "",
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      // Filter out empty strings/nulls to avoid sending unnecessary keys or triggering Joi errors
      const processedValues = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== "" && value !== null)
      );

      try {
        await updateProfile(processedValues).unwrap();
        toast.success(t("profileUpdateSuccess"));
        refetch(); // Refresh data to ensure consistency
      } catch (err) {
        toast.error(err?.data?.message || t("profileUpdateError"));
      }
    },
  });

  if (isLoading && !userData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="error">Failed to load profile. Please try again later.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in={true} timeout={800}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 6,
            bgcolor: isDark ? "rgba(17, 24, 39, 0.6)" : "white",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.05)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box display="flex" alignItems="center" gap={2} mb={4}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "white",
                display: "flex",
                boxShadow: "0 8px 16px rgba(37, 99, 235, 0.3)",
              }}
            >
              <ProfileIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="800" sx={{ color: isDark ? "white" : "slate.900" }}>
                {t("myProfile")}
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? "gray.400" : "slate.500" }}>
                {t("profileSubtitle")}
              </Typography>
            </Box>
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormInput
                  label={t("username")}
                  name="username"
                  placeholder={t("username")}
                  formik={formik}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput
                  label={t("email")}
                  name="email"
                  type="email"
                  placeholder={t("email")}
                  formik={formik}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput
                  label={t("first_name")}
                  name="first_name"
                  placeholder={t("first_name")}
                  formik={formik}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput
                  label={t("last_name")}
                  name="last_name"
                  placeholder={t("last_name")}
                  formik={formik}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput
                  label={t("sex")}
                  name="sex"
                  select
                  formik={formik}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="MALE">{t("male")}</MenuItem>
                  <MenuItem value="FEMALE">{t("female")}</MenuItem>
                  <MenuItem value="OTHER">{t("other")}</MenuItem>
                </FormInput>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput
                  label={t("date_of_birth")}
                  name="date_of_birth"
                  type="date"
                  formik={formik}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 1 }}>
                <FormButton
                  isLoading={updating}
                  fullWidth={false}
                  sx={{
                    minWidth: 180,
                    py: 1,
                    borderRadius: 3,
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.4)",
                  }}
                >
                  {t("updateProfileBtn")}
                </FormButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Fade>
    </Container>
  );
};

export default Profile;
