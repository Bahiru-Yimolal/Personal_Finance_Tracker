import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
    CircularProgress,
    Alert,
    InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from '../../../hooks/useTranslation';
import { useRegisterUserMutation } from '../redux/authApiSlice';
import { useSelector } from 'react-redux';

const RegisterModal = ({ open, handleClose, openLogin }) => {
    const { t } = useTranslation();
    const isDark = useSelector((state) => state.ui.theme === 'dark');
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [localSuccess, setLocalSuccess] = useState(false);

    const validate = () => {
        const errors = {};
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

        if (formData.username.length < 3) errors.username = t('username') + " must be at least 3 chars";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = t('email') + " is invalid";
        if (!passwordRegex.test(formData.password)) errors.password = t('passwordHint');
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (validationErrors[e.target.name]) {
            setValidationErrors({ ...validationErrors, [e.target.name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await registerUser({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            }).unwrap();
            setLocalSuccess(true);
            setTimeout(() => {
                handleClose();
                setLocalSuccess(false);
                setFormData({ username: '', email: '', password: '', confirmPassword: '' });
            }, 20000);
        } catch (err) {
            console.error('Failed to register:', err);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    bgcolor: isDark ? '#111827' : 'white',
                    backgroundImage: 'none',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" px={3} pt={3}>
                <Typography variant="h5" fontWeight="800" sx={{ color: isDark ? 'white' : 'slate.900' }}>
                    {t('register')}
                </Typography>
                <IconButton onClick={handleClose} size="small" sx={{ color: isDark ? 'gray.400' : 'gray.500' }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogContent sx={{ px: { xs: 2.5, sm: 4 }, pb: 4 }}>
                <Typography variant="body2" sx={{ mb: 4, color: isDark ? 'gray.400' : 'slate.600' }}>
                    {t('registerSubtitle')}
                </Typography>

                {localSuccess ? (
                    <Alert severity="success" sx={{ borderRadius: 2, mb: 2 }}>
                        {t('registerSuccess')}
                    </Alert>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" gap={2.5}>
                            <TextField
                                name="username"
                                label={t('username')}
                                fullWidth
                                value={formData.username}
                                onChange={handleChange}
                                error={!!validationErrors.username}
                                helperText={validationErrors.username}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonOutlineIcon fontSize="small" color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                name="email"
                                label={t('email')}
                                fullWidth
                                value={formData.email}
                                onChange={handleChange}
                                error={!!validationErrors.email}
                                helperText={validationErrors.email}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlineIcon fontSize="small" color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                name="password"
                                label={t('password')}
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                value={formData.password}
                                onChange={handleChange}
                                error={!!validationErrors.password}
                                helperText={validationErrors.password}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon fontSize="small" color="primary" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                name="confirmPassword"
                                label={t('confirmPassword')}
                                type="password"
                                fullWidth
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={!!validationErrors.confirmPassword}
                                helperText={validationErrors.confirmPassword}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon fontSize="small" color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {error && (
                                <Alert severity="error" sx={{ borderRadius: 2 }}>
                                    {error?.data?.message || t('registerError')}
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={isLoading}
                                sx={{
                                    py: 1.8,
                                    mt: 1,
                                    borderRadius: 3,
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)',
                                }}
                            >
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : t('registerBtn')}
                            </Button>

                            <Typography variant="body2" textAlign="center" sx={{ mt: 1, color: isDark ? 'gray.500' : 'slate.500' }}>
                                {t('alreadyHaveAccount')}{' '}
                                <Box
                                    component="span"
                                    onClick={() => {
                                        handleClose();
                                        openLogin();
                                    }}
                                    sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    {t('login')}
                                </Box>
                            </Typography>
                        </Box>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default RegisterModal;
