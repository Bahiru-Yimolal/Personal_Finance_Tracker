import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    IconButton,
    TextField,
    Button,
    CircularProgress,
    Alert,
    InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from '../../../hooks/useTranslation';
import { useLoginUserMutation } from '../redux/authApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ open, handleClose, openRegister }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isDark = useSelector((state) => state.ui.theme === 'dark');
    const [loginUser, { isLoading, error }] = useLoginUserMutation();

    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [localSuccess, setLocalSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(formData).unwrap();
            setLocalSuccess(true);
            setTimeout(() => {
                handleClose();
                setLocalSuccess(false);
                navigate('/dashboard');
            }, 1000);
        } catch (err) {
            console.error('Failed to login:', err);
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
                    {t('login')}
                </Typography>
                <IconButton onClick={handleClose} size="small" sx={{ color: isDark ? 'gray.400' : 'gray.500' }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogContent sx={{ px: { xs: 2.5, sm: 4 }, pb: 4 }}>
                <Typography variant="body2" sx={{ mb: 4, color: isDark ? 'gray.400' : 'slate.600' }}>
                    {t('loginSubtitle')}
                </Typography>

                {localSuccess ? (
                    <Alert severity="success" sx={{ borderRadius: 2, mb: 2 }}>
                        {t('loginSuccess')}
                    </Alert>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" gap={2.5}>
                            <TextField
                                name="identifier"
                                label={t('identifier')}
                                fullWidth
                                required
                                value={formData.identifier}
                                onChange={handleChange}
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
                                required
                                value={formData.password}
                                onChange={handleChange}
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

                            {error && (
                                <Alert severity="error" sx={{ borderRadius: 2 }}>
                                    {error?.data?.message || t('loginError')}
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
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : t('loginBtn')}
                            </Button>

                            <Typography variant="body2" textAlign="center" sx={{ mt: 1, color: isDark ? 'gray.500' : 'slate.500' }}>
                                {t('dontHaveAccount')}{' '}
                                <Box
                                    component="span"
                                    onClick={() => {
                                        handleClose();
                                        openRegister();
                                    }}
                                    sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    {t('register')}
                                </Box>
                            </Typography>
                        </Box>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
