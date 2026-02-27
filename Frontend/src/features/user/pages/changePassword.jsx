import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
  Fade,
} from '@mui/material';
import {
  LockResetOutlined as PasswordIcon,
  Visibility,
  VisibilityOff,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { useTranslation } from '../../../hooks/useTranslation';
import { useUpdatePasswordMutation } from '../../auth/redux/authApiSlice';
import { useSelector } from 'react-redux';

const ChangePassword = () => {
  const { t } = useTranslation();
  const isDark = useSelector((state) => state.ui.theme === 'dark');
  const [updatePassword, { isLoading, error, isSuccess }] = useUpdatePasswordMutation();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setLocalError(t('passwordsDoNotMatch'));
      return;
    }

    try {
      await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (err) {
      console.error('Failed to update password:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', py: 4, px: 2 }}>
      <Fade in={true} timeout={800}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 6,
            bgcolor: isDark ? 'rgba(17, 24, 39, 0.6)' : 'white',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box display="flex" alignItems="center" gap={2} mb={4}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 3,
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)',
              }}
            >
              <PasswordIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="800" sx={{ color: isDark ? 'white' : 'slate.900' }}>
                {t('changePassword')}
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? 'gray.400' : 'slate.500' }}>
                {t('passwordHint')}
              </Typography>
            </Box>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                name="currentPassword"
                label={t('currentPassword')}
                type={showCurrent ? 'text' : 'password'}
                fullWidth
                required
                value={formData.currentPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowCurrent(!showCurrent)} edge="end" size="small">
                        {showCurrent ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="newPassword"
                label={t('newPassword')}
                type={showNew ? 'text' : 'password'}
                fullWidth
                required
                value={formData.newPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowNew(!showNew)} edge="end" size="small">
                        {showNew ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="confirmNewPassword"
                label={t('confirmNewPassword')}
                type={showConfirm ? 'text' : 'password'}
                fullWidth
                required
                value={formData.confirmNewPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end" size="small">
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {(error || localError) && (
                <Alert severity="error" sx={{ borderRadius: 3 }}>
                  {localError || error?.data?.message || t('passwordUpdateError')}
                </Alert>
              )}

              {isSuccess && (
                <Alert severity="success" sx={{ borderRadius: 3 }}>
                  {t('passwordUpdateSuccess')}
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
                {isLoading ? <CircularProgress size={24} color="inherit" /> : t('updatePasswordBtn')}
              </Button>
            </Box>
          </form>

          {/* <Box mt={4} pt={4} borderTop={`1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`}>
            <Box display="flex" alignItems="start" gap={2}>
              <SecurityIcon sx={{ color: 'primary.main', mt: 0.5 }} fontSize="small" />
              <Typography variant="caption" sx={{ color: isDark ? 'gray.500' : 'slate.400', lineHeight: 1.6 }}>
                Security tip: Use a combination of letters, numbers, and symbols to create a strong password. Avoid using common words or personal information.
              </Typography>
            </Box>
          </Box> */}
        </Paper>
      </Fade>
    </Box>
  );
};

export default ChangePassword;
