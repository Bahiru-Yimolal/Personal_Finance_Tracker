import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    MenuItem,
    CircularProgress,
    Alert,
    Fade,
    InputAdornment,
} from '@mui/material';
import {
    EditCalendar as EditIcon,
    AddCircleOutline as AddIcon,
    AttachMoney as MoneyIcon,
    CategoryOutlined as CategoryIcon,
    DescriptionOutlined as DescriptionIcon,
    CalendarTodayOutlined as DateIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from '../../../hooks/useTranslation';
import { useCreateTransactionMutation, useUpdateTransactionMutation } from '../redux/transactionApiSlice';
import { useSelector } from 'react-redux';

const TransactionForm = ({ initialData, isUpdate = false, onSuccess }) => {
    const { t } = useTranslation();
    const isDark = useSelector((state) => state.ui.theme === 'dark');
    const [createTransaction, { isLoading: isCreating, error: createError, isSuccess: createSuccess }] = useCreateTransactionMutation();
    const [updateTransaction, { isLoading: isUpdating, error: updateError, isSuccess: updateSuccess }] = useUpdateTransactionMutation();

    const isLoading = isCreating || isUpdating;
    const error = createError || updateError;
    const isSuccess = createSuccess || updateSuccess;

    const formik = useFormik({
        initialValues: {
            amount: initialData?.amount || '',
            type: initialData?.type || 'expense',
            category: initialData?.category?.name || initialData?.category || '',
            description: initialData?.description || '',
            date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            amount: Yup.number().positive(t('number.positive')).required(t('any.required')),
            type: Yup.string().oneOf(['income', 'expense']).required(t('any.required')),
            category: Yup.string().required(t('string.empty')),
            description: Yup.string().max(500),
            date: Yup.date().required(t('any.required')),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                if (isUpdate) {
                    await updateTransaction({ id: initialData.id, ...values }).unwrap();
                } else {
                    await createTransaction(values).unwrap();
                    resetForm();
                }
                if (onSuccess) onSuccess();
            } catch (err) {
                console.error(`Failed to ${isUpdate ? 'update' : 'create'} transaction:`, err);
            }
        },
    });

    return (
        <Fade in={true} timeout={800}>
            <Box>
                <Box display="flex" alignItems="center" gap={2} mb={4}>
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: 3,
                            bgcolor: isUpdate ? 'secondary.main' : 'primary.main',
                            color: 'white',
                            display: 'flex',
                            boxShadow: isUpdate ? '0 8px 16px rgba(139, 92, 246, 0.3)' : '0 8px 16px rgba(37, 99, 235, 0.3)',
                        }}
                    >
                        {isUpdate ? <EditIcon fontSize="medium" /> : <AddIcon fontSize="medium" />}
                    </Box>
                    <Box>
                        <Typography variant="h5" fontWeight="800" sx={{ color: isDark ? 'white' : 'slate.900' }}>
                            {isUpdate ? t('updateTransaction') || 'Update Transaction' : t('addTransaction')}
                        </Typography>
                        <Typography variant="body2" sx={{ color: isDark ? 'gray.400' : 'slate.500' }}>
                            {isUpdate ? t('editTransactionDesc') || 'Modify your transaction details' : t('heroSubtitle')}
                        </Typography>
                    </Box>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                            <TextField
                                fullWidth
                                id="amount"
                                name="amount"
                                label={t('amount')}
                                type="number"
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                error={formik.touched.amount && Boolean(formik.errors.amount)}
                                helperText={formik.touched.amount && formik.errors.amount}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MoneyIcon sx={{ color: isUpdate ? 'secondary.main' : 'primary.main' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                id="type"
                                name="type"
                                select
                                label={t('type')}
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                error={formik.touched.type && Boolean(formik.errors.type)}
                                helperText={formik.touched.type && formik.errors.type}
                            >
                                <MenuItem value="income">{t('income')}</MenuItem>
                                <MenuItem value="expense">{t('expense')}</MenuItem>
                            </TextField>
                        </Box>

                        <TextField
                            fullWidth
                            id="category"
                            name="category"
                            label={t('category')}
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            helperText={formik.touched.category && formik.errors.category}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CategoryIcon sx={{ color: isUpdate ? 'secondary.main' : 'primary.main' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            id="date"
                            name="date"
                            label={t('date')}
                            type="date"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            error={formik.touched.date && Boolean(formik.errors.date)}
                            helperText={formik.touched.date && formik.errors.date}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DateIcon sx={{ color: isUpdate ? 'secondary.main' : 'primary.main' }} />
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label={t('description')}
                            multiline
                            rows={3}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionIcon sx={{ color: isUpdate ? 'secondary.main' : 'primary.main', mt: -4 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {error && (
                            <Alert severity="error" sx={{ borderRadius: 3 }}>
                                {error?.data?.message || t('transactionError')}
                            </Alert>
                        )}

                        {isSuccess && !isUpdate && (
                            <Alert severity="success" sx={{ borderRadius: 3 }}>
                                {t('transactionSuccess')}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isLoading}
                            color={isUpdate ? 'secondary' : 'primary'}
                            sx={{
                                py: 1.8,
                                borderRadius: 3,
                                fontWeight: 'bold',
                                textTransform: 'none',
                                fontSize: '1rem',
                                boxShadow: isUpdate ? '0 10px 15px -3px rgba(139, 92, 246, 0.4)' : '0 10px 15px -3px rgba(37, 99, 235, 0.4)',
                            }}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : (isUpdate ? t('update') || 'Update' : t('addTransaction'))}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Fade>
    );
};

export default TransactionForm;
