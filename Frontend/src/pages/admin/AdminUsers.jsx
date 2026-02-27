import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    CircularProgress,
    Alert,
    Fade,
    IconButton,
    Stack,
    Grid,
    Tooltip,
    InputAdornment,
    TextField,
    MenuItem,
    Pagination,
    Switch,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import {
    People as PeopleIcon,
    Search as SearchIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    CalendarToday as DateIcon,
    VerifiedUser as RoleIcon,
    ToggleOn as ActiveIcon,
    ToggleOff as InactiveIcon,
    LockReset as ResetIcon,
} from '@mui/icons-material';
import { useTranslation } from '../../hooks/useTranslation';
import { useGetUsersQuery, useUpdateUserStatusMutation, useAdminResetPasswordMutation } from '../../features/user/redux/userApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AdminUsers = () => {
    const { t } = useTranslation();
    const isDark = useSelector((state) => state.ui.theme === 'dark');
    const [filters, setFilters] = React.useState({
        search: '',
        page: 1,
        limit: 10
    });

    const { data: response, isLoading, error } = useGetUsersQuery(filters);
    const [updateUserStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();
    const [adminResetPassword, { isLoading: isResetting }] = useAdminResetPasswordMutation();

    const users = response?.data;
    const pagination = response?.pagination;

    const [statusConfirm, setStatusConfirm] = React.useState({
        open: false,
        user: null,
        newStatus: ''
    });

    const [resetDialog, setResetDialog] = React.useState({
        open: false,
        user: null,
        defaultPassword: 'Password123!'
    });

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value, page: 1 }));
    };

    const handlePageChange = (event, value) => {
        setFilters(prev => ({ ...prev, page: value }));
    };

    const handleStatusToggleClick = (user) => {
        const newStatus = user.status === 'ACTIVE' ? 'DEACTIVATED' : 'ACTIVE';
        setStatusConfirm({
            open: true,
            user,
            newStatus
        });
    };

    const handleResetClick = (user) => {
        setResetDialog({
            open: true,
            user,
            defaultPassword: 'Password123!'
        });
    };

    const handleConfirmStatusChange = async () => {
        try {
            await updateUserStatus({
                userId: statusConfirm.user.id,
                status: statusConfirm.newStatus
            }).unwrap();
            toast.success(t('statusUpdateSuccess'));
            setStatusConfirm({ open: false, user: null, newStatus: '' });
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update status');
        }
    };

    const handleConfirmPasswordReset = async () => {
        try {
            await adminResetPassword({
                userId: resetDialog.user.id,
                defaultPassword: resetDialog.defaultPassword
            }).unwrap();
            toast.success(t('passwordResetSuccess'));
            setResetDialog({ open: false, user: null, defaultPassword: '' });
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to reset password');
        }
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error">{error?.data?.message || 'Error loading users'}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', py: { xs: 2, md: 4 }, px: 2 }}>
            <Fade in={true} timeout={800}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2, md: 5 },
                        borderRadius: { xs: 4, md: 6 },
                        bgcolor: isDark ? 'rgba(17, 24, 39, 0.6)' : 'white',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                        <Box display="flex" alignItems="center" gap={2}>
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
                                <PeopleIcon fontSize="medium" />
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight="800" sx={{ color: isDark ? 'white' : 'slate.900' }}>
                                    {t('userManagement')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: isDark ? 'gray.400' : 'slate.500' }}>
                                    {t('userManagementSubtitle')}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Search & Rows Per Page */}
                    <Box sx={{ mb: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <TextField
                                    fullWidth
                                    placeholder={t('search') + " " + t('userSearchPlaceholder')}
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small" color="action" />
                                            </InputAdornment>
                                        ),
                                        sx: { borderRadius: 3 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    select
                                    fullWidth
                                    label={t('rowsPerPage')}
                                    value={filters.limit}
                                    onChange={(e) => handleFilterChange('limit', e.target.value)}
                                    InputProps={{ sx: { borderRadius: 3 } }}
                                >
                                    {[5, 10, 20, 50].map((pageSize) => (
                                        <MenuItem key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Box>

                    <TableContainer sx={{ overflowX: 'auto' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{t('username')}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{t('first_name')} {t('last_name')}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{t('email')}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{t('role')}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{t('status')}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{t('joined')}</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>{t('actions')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users?.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            '&:hover': { bgcolor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0,0,0,0.01)' },
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <TableCell sx={{ fontWeight: '600' }}>{user.username}</TableCell>
                                        <TableCell>{user.first_name} {user.last_name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.role}
                                                size="small"
                                                color={user.role === 'ADMIN' ? 'secondary' : 'default'}
                                                sx={{ fontWeight: 'bold', borderRadius: 1 }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.status === 'ACTIVE' ? t('active') : t('deactivated')}
                                                color={user.status === 'ACTIVE' ? 'success' : 'error'}
                                                size="small"
                                                variant="outlined"
                                                sx={{ fontWeight: 'bold', borderRadius: 2 }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                                <Tooltip title={user.status === 'ACTIVE' ? t('deactivate') : t('activate')}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                size="small"
                                                                checked={user.status === 'ACTIVE'}
                                                                onChange={() => handleStatusToggleClick(user)}
                                                                color="success"
                                                                disabled={isUpdating}
                                                            />
                                                        }
                                                        label=""
                                                        sx={{ m: 0 }}
                                                    />
                                                </Tooltip>
                                                <Tooltip title={t('resetPasswordAdmin')}>
                                                    <IconButton
                                                        size="small"
                                                        color="secondary"
                                                        onClick={() => handleResetClick(user)}
                                                        disabled={isResetting}
                                                        sx={{ bgcolor: 'secondary.main', color: 'white', '&:hover': { bgcolor: 'secondary.dark' }, p: 0.8 }}
                                                    >
                                                        <ResetIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!users || users.length === 0) && (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 8, color: 'text.secondary' }}>
                                            <Typography variant="body1">{t('noUsersFound')}</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                            <Pagination
                                count={pagination.totalPages}
                                page={filters.page}
                                onChange={handlePageChange}
                                color="primary"
                                shape="rounded"
                                size="large"
                            />
                        </Box>
                    )}
                    {pagination && (
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                                {t('totalItems')}: {pagination.totalItems} | {t('page')} {pagination.currentPage} of {pagination.totalPages}
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Fade>

            {/* Status Change Confirmation Dialog */}
            <Dialog
                open={statusConfirm.open}
                onClose={() => setStatusConfirm({ open: false, user: null, newStatus: '' })}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        bgcolor: isDark ? 'slate.900' : 'white',
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: '900' }}>
                    {t('changeStatus')}
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: 'text.secondary' }}>
                        {t('confirmStatusChange')} <br />
                        <strong>{t('userLabel')}: {statusConfirm.user?.username}</strong> <br />
                        <strong>{t('newStatusLabel')}: {statusConfirm.newStatus === 'ACTIVE' ? t('active') : t('deactivated')}</strong>
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button
                        onClick={() => setStatusConfirm({ open: false, user: null, newStatus: '' })}
                        sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        onClick={handleConfirmStatusChange}
                        variant="contained"
                        color={statusConfirm.newStatus === 'ACTIVE' ? "success" : "error"}
                        sx={{ borderRadius: 2, fontWeight: 'bold' }}
                        disabled={isUpdating}
                    >
                        {statusConfirm.newStatus === 'ACTIVE' ? t('activate') : t('deactivate')}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Password Reset Dialog */}
            <Dialog
                open={resetDialog.open}
                onClose={() => setResetDialog({ open: false, user: null, defaultPassword: '' })}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        bgcolor: isDark ? 'slate.900' : 'white',
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: '900' }}>
                    {t('resetPasswordAdmin')}
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: 'text.secondary', mb: 3 }}>
                        {t('confirmResetPassword')} <br />
                        <strong>User: {resetDialog.user?.username}</strong>
                    </Typography>
                    <TextField
                        fullWidth
                        label={t('defaultPassword')}
                        value={resetDialog.defaultPassword}
                        onChange={(e) => setResetDialog({ ...resetDialog, defaultPassword: e.target.value })}
                        sx={{ mt: 1 }}
                        InputProps={{ sx: { borderRadius: 3 } }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button
                        onClick={() => setResetDialog({ open: false, user: null, defaultPassword: '' })}
                        sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        onClick={handleConfirmPasswordReset}
                        variant="contained"
                        color="secondary"
                        sx={{ borderRadius: 2, fontWeight: 'bold' }}
                        disabled={isResetting}
                    >
                        {t('resetPasswordAdmin')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminUsers;
