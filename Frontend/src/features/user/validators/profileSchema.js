// src/features/user/validators/profileSchema.js
import * as Yup from 'yup';

export const profileSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username is too long')
    .required('Username is required'),
  first_name: Yup.string()
    .max(100, 'Too Long!')
    .nullable(),
  last_name: Yup.string()
    .max(100, 'Too Long!')
    .nullable(),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  sex: Yup.string()
    .oneOf(['MALE', 'FEMALE', 'OTHER'], 'Invalid sex')
    .nullable(),
  date_of_birth: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .nullable(),
});

