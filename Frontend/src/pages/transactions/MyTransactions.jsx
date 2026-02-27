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
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Divider,
    Stack,
    Grid,
    Tooltip,
    InputAdornment,
} from '@mui/material';
import {
    TrendingUp as IncomeIcon,
    TrendingDown as ExpenseIcon,
    History as HistoryIcon,
    AddCircleOutline as AddIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    Close as CloseIcon,
    Edit as EditIcon,
    Visibility as ViewIcon,
    CalendarToday as DateIcon,
    Category as CategoryIcon,
    AttachMoney as MoneyIcon,
    Description as DescIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import {
    useGetTransactionsQuery,
    useGetCategoriesQuery,
    useDeleteTransactionMutation
} from '../../features/transactions/redux/transactionApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TransactionForm from '../../features/transactions/components/TransactionForm';
import { TextField, MenuItem, Pagination } from '@mui/material';

const MyTransactions = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isDark = useSelector((state) => state.ui.theme === 'dark');
    const [filters, setFilters] = React.useState({
        search: '',
        type: '',
        category: '',
        startDate: '',
        endDate: '',
        page: 1,
        limit: 10
    });

    const { data: response, isLoading, error } = useGetTransactionsQuery(filters);
    const { data: categories } = useGetCategoriesQuery();
    const transactions = response?.data;
    const pagination = response?.pagination;

    const [deleteTransaction] = useDeleteTransactionMutation();

    const [modalState, setModalState] = React.useState({
        open: false,
        mode: null, // 'detail' | 'edit'
        transaction: null
    });

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value, page: 1 }));
    };

    const handlePageChange = (event, value) => {
        setFilters(prev => ({ ...prev, page: value }));
    };

    const [deleteConfirm, setDeleteConfirm] = React.useState({
        open: false,
        id: null
    });

    const handleOpenModal = (mode, transaction) => {
        setModalState({ open: true, mode, transaction });
    };

    const handleCloseModal = () => {
        setModalState({ ...modalState, open: false });
    };

    const handleDeleteClick = (id) => {
        setDeleteConfirm({ open: true, id });
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteTransaction(deleteConfirm.id).unwrap();
            setDeleteConfirm({ open: false, id: null });
            toast.success(t('deleteSuccess') || 'Transaction deleted successfully!');
        } catch (err) {
            console.error('Failed to delete transaction:', err);
            toast.error(err?.data?.message || t('transactionError'));
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
                <Alert severity="error">{error?.data?.message || t('transactionError')}</Alert>
            </Box>
        );
    }

    const DetailItem = ({ icon, label, value, color = 'primary.main' }) => (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
            <Box
                sx={{
                    p: 1.2,
                    borderRadius: 2,
                    bgcolor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                    color: color,
                    display: 'flex',
                }}
            >
                {React.cloneElement(icon, { sx: { fontSize: 22 } })}
            </Box>
            <Box>
                <Typography
                    variant="caption"
                    fontWeight="700"
                    sx={{
                        color: 'text.secondary',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        fontSize: '0.65rem',
                        display: 'block',
                        mb: 0.5
                    }}
                >
                    {label}
                </Typography>
                <Typography variant="body1" fontWeight="600" sx={{ color: isDark ? 'white' : 'slate.900' }}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', py: { xs: 2, md: 4 }, px: 2 }}>
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
                                    bgcolor: 'secondary.main',
                                    color: 'white',
                                    display: 'flex',
                                    boxShadow: '0 8px 16px rgba(139, 92, 246, 0.3)',
                                }}
                            >
                                <HistoryIcon fontSize="medium" />
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight="800" sx={{ color: isDark ? 'white' : 'slate.900' }}>
                                    {t('myTransactions')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: isDark ? 'gray.400' : 'slate.500' }}>
                                    {t('featuresSubtitle')}
                                </Typography>
                            </Box>
                        </Box>

                        <Button
                            variant="contained"
                            fullWidth={{ xs: true, sm: false }}
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/transaction')}
                            sx={{
                                borderRadius: 3,
                                fontWeight: 'bold',
                                textTransform: 'none',
                                boxShadow: '0 8px 16px rgba(139, 92, 246, 0.2)',
                                px: 3
                            }}
                        >
                            {t('addTransaction')}
                        </Button>
                    </Box>

                    {/* Filter Bar */}
                    <Box sx={{ mb: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    placeholder={t('search')}
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
                            <Grid item xs={6} md={2}>
                                <TextField
                                    select
                                    fullWidth
                                    label={t('type')}
                                    value={filters.type}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                    InputProps={{ sx: { borderRadius: 3 } }}
                                >
                                    <MenuItem value="">{t('allTypes')}</MenuItem>
                                    <MenuItem value="income">{t('income')}</MenuItem>
                                    <MenuItem value="expense">{t('expense')}</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <TextField
                                    select
                                    fullWidth
                                    label={t('category')}
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    InputProps={{ sx: { borderRadius: 3 } }}
                                >
                                    <MenuItem value="">{t('allCategories')}</MenuItem>
                                    {categories?.map((cat) => (
                                        <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label={t('startDate')}
                                    value={filters.startDate}
                                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ sx: { borderRadius: 3 } }}
                                />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label={t('endDate')}
                                    value={filters.endDate}
                                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ sx: { borderRadius: 3 } }}
                                />
                            </Grid>
                            <Grid item xs={6} md={2}>
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
                        <Table sx={{ minWidth: 600 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{t('date')}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{t('category')}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{t('type')}</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>{t('amount')}</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>{t('actions') || 'Actions'}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions?.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            '&:hover': { bgcolor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0,0,0,0.01)' },
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                                            {new Date(row.date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: '500' }}>
                                            {row.category?.name || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                icon={row.type === 'income' ? <IncomeIcon /> : <ExpenseIcon />}
                                                label={t(row.type)}
                                                size="small"
                                                color={row.type === 'income' ? 'success' : 'error'}
                                                variant="outlined"
                                                sx={{ borderRadius: 2, fontWeight: 'bold' }}
                                            />
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontWeight: '800', color: row.type === 'income' ? 'success.main' : 'error.main' }}>
                                            {row.type === 'income' ? '+' : '-'}${parseFloat(row.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" spacing={0.5} justifyContent="center">
                                                <Tooltip title={t('details') || 'Details'}>
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => handleOpenModal('detail', row)}
                                                        sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' }, p: 1 }}
                                                    >
                                                        <ViewIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={t('edit') || 'Edit'}>
                                                    <IconButton
                                                        size="small"
                                                        color="secondary"
                                                        onClick={() => handleOpenModal('edit', row)}
                                                        sx={{ bgcolor: 'secondary.main', color: 'white', '&:hover': { bgcolor: 'secondary.dark' }, p: 1 }}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={t('delete') || 'Delete'}>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleDeleteClick(row.id)}
                                                        sx={{ bgcolor: 'error.main', color: 'white', '&:hover': { bgcolor: 'error.dark' }, p: 1 }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!transactions || transactions.length === 0) && (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 8, color: 'text.secondary' }}>
                                            <Typography variant="body1">No transactions found.</Typography>
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

            {/* Transaction Modals */}
            <Dialog
                open={modalState.open}
                onClose={handleCloseModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: { xs: 3, sm: 5 },
                        bgcolor: isDark ? 'slate.900' : 'white',
                        backgroundImage: 'none',
                    }
                }}
            >
                <DialogTitle sx={{ m: 0, p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: -0.5 }}>
                        {modalState.mode === 'edit'
                            ? (t('updateTransaction') || 'Update Transaction')
                            : (t('transactionDetails') || 'Transaction Details')
                        }
                    </Typography>
                    <IconButton onClick={handleCloseModal} size="small" sx={{ color: 'text.secondary' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: { xs: 2, sm: 4 }, pt: 0 }}>
                    {modalState.mode === 'detail' && modalState.transaction && (
                        <Box>
                            <Box
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    bgcolor: modalState.transaction.type === 'income' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                                    mb: 4,
                                    textAlign: 'center'
                                }}
                            >
                                <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ textTransform: 'uppercase', letterSpacing: 1.5, mb: 1, display: 'block' }}>
                                    {t('totalAmount') || 'Total Amount'}
                                </Typography>
                                <Typography
                                    variant="h3"
                                    fontWeight="900"
                                    sx={{
                                        color: modalState.transaction.type === 'income' ? 'success.main' : 'error.main',
                                        letterSpacing: -1
                                    }}
                                >
                                    {modalState.transaction.type === 'income' ? '+' : '-'}${parseFloat(modalState.transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </Typography>
                            </Box>

                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={6}>
                                    <DetailItem icon={<CategoryIcon />} label={t('category')} value={modalState.transaction.category?.name || 'N/A'} />
                                    <DetailItem
                                        icon={modalState.transaction.type === 'income' ? <IncomeIcon /> : <ExpenseIcon />}
                                        label={t('type')}
                                        value={t(modalState.transaction.type)}
                                        color={modalState.transaction.type === 'income' ? 'success.main' : 'error.main'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DetailItem icon={<DateIcon />} label={t('date')} value={new Date(modalState.transaction.date).toLocaleDateString(undefined, { dateStyle: 'long' })} />
                                    <DetailItem icon={<MoneyIcon />} label={t('amount')} value={`$${parseFloat(modalState.transaction.amount).toFixed(2)}`} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider sx={{ my: 3, opacity: 0.6 }} />
                                    <DetailItem icon={<DescIcon />} label={t('description')} value={modalState.transaction.description || 'No description provided'} />
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                    {modalState.mode === 'edit' && modalState.transaction && (
                        <Box sx={{ mt: 1 }}>
                            <TransactionForm
                                isUpdate
                                initialData={modalState.transaction}
                                onSuccess={handleCloseModal}
                            />
                        </Box>
                    )}
                </DialogContent>
                {modalState.mode === 'detail' && (
                    <DialogActions sx={{ p: 3, pt: 0 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={() => handleOpenModal('edit', modalState.transaction)}
                            startIcon={<EditIcon />}
                            sx={{
                                borderRadius: 3,
                                py: 1.5,
                                fontWeight: '900',
                                boxShadow: '0 8px 16px rgba(139, 92, 246, 0.2)'
                            }}
                        >
                            {t('edit') || 'Edit'}
                        </Button>
                    </DialogActions>
                )}
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteConfirm.open}
                onClose={() => setDeleteConfirm({ open: false, id: null })}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        bgcolor: isDark ? 'slate.900' : 'white',
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: '900' }}>
                    {t('deleteConfirmTitle')}
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: 'text.secondary' }}>
                        {t('deleteConfirmMessage')}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button
                        onClick={() => setDeleteConfirm({ open: false, id: null })}
                        sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        variant="contained"
                        color="error"
                        sx={{ borderRadius: 2, fontWeight: 'bold' }}
                    >
                        {t('delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MyTransactions;
