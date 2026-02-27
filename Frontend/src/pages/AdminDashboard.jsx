import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    CircularProgress,
    Alert,
    Fade,
    useTheme,
    Card,
    CardContent,
    Stack,
    IconButton,
    TextField,
    MenuItem,
    Divider,
} from '@mui/material';
import {
    People as PeopleIcon,
    TrendingUp as IncomeIcon,
    TrendingDown as ExpenseIcon,
    AccountBalance as BalanceIcon,
    Security as SecurityIcon,
    CheckCircle as SuccessIcon,
    Error as ErrorIcon,
    Login as LoginIcon,
    CalendarToday as DateIcon,
    Assessment as ReportIcon,
} from '@mui/icons-material';
import { useTranslation } from '../hooks/useTranslation';
import { useGetAdminOverviewReportQuery } from '../features/admin/redux/adminApiSlice';
import { useSelector } from 'react-redux';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as ChartTooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
} from 'recharts';

const StatCard = ({ title, value, subValue, icon, color, isDark }) => (
    <Card
        elevation={0}
        sx={{
            height: '100%',
            borderRadius: 5,
            bgcolor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'white',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: isDark ? '0 12px 24px rgba(0,0,0,0.4)' : '0 12px 24px rgba(0,0,0,0.05)',
            }
        }}
    >
        <CardContent sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box
                    sx={{
                        p: 1.5,
                        borderRadius: 3,
                        bgcolor: `${color}15`,
                        color: color,
                        display: 'flex'
                    }}
                >
                    {React.cloneElement(icon, { fontSize: 'medium' })}
                </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 0.5 }}>
                {title}
            </Typography>
            <Typography variant="h4" fontWeight="800" sx={{ letterSpacing: -1 }}>
                {value}
            </Typography>
            {subValue && (
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mt: 0.5, display: 'block' }}>
                    {subValue}
                </Typography>
            )}
        </CardContent>
    </Card>
);

const SectionHeader = ({ title, icon, isDark }) => (
    <Box display="flex" alignItems="center" gap={1.5} mb={3} mt={2}>
        <Box sx={{ color: 'primary.main', display: 'flex' }}>
            {React.cloneElement(icon, { fontSize: 'small' })}
        </Box>
        <Typography variant="subtitle1" fontWeight="800" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem', color: isDark ? 'gray.400' : 'slate.600' }}>
            {title}
        </Typography>
    </Box>
);

const AdminDashboard = () => {
    const { t } = useTranslation();
    const isDark = useSelector((state) => state.ui.theme === 'dark');
    const theme = useTheme();

    // Default to last 30 days
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const [dateRange, setDateRange] = React.useState({
        startDate: thirtyDaysAgo,
        endDate: today
    });

    const { data: response, isLoading, error } = useGetAdminOverviewReportQuery(dateRange);
    const report = response?.data;

    const handleDateChange = (field, value) => {
        setDateRange(prev => ({ ...prev, [field]: value }));
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
                <CircularProgress thickness={5} size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error" variant="filled" sx={{ borderRadius: 4 }}>
                    {error?.data?.message || t('transactionError')}
                </Alert>
            </Box>
        );
    }

    const COLORS = [theme.palette.primary.main, theme.palette.secondary.main, '#10B981', '#F59E0B', '#EF4444'];

    // Transform top categories for bar chart
    const categoryData = report?.topCategoriesSystemWide || [];

    // Transform user status for pie chart
    const userStatusData = [
        { name: t('active'), value: report?.userActivity?.activeUsers || 0, color: '#10B981' },
        { name: t('deactivated'), value: report?.userActivity?.deactivatedUsers || 0, color: '#EF4444' }
    ];

    // Finance Area Chart Data
    // For a simple visualization with 2 points (start and end), we'll repeat the data
    const financeData = [
        { name: report?.period?.startDate, income: report?.financialPerformance?.platformTotalIncome, expense: report?.financialPerformance?.platformTotalExpenses },
        { name: report?.period?.endDate, income: report?.financialPerformance?.platformTotalIncome, expense: report?.financialPerformance?.platformTotalExpenses }
    ];

    return (
        <Box sx={{ maxWidth: 1400, mx: 'auto', py: { xs: 2, md: 5 }, px: 3 }}>
            <Fade in={true} timeout={800}>
                <Box>
                    {/* Header & Date Filter */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={6} flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
                        <Box>
                            <Box display="flex" alignItems="center" gap={2} mb={1}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 3,
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        display: 'flex',
                                        boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)',
                                    }}
                                >
                                    <ReportIcon fontSize="medium" />
                                </Box>
                                <Typography variant="h3" fontWeight="900" sx={{ letterSpacing: -1.5, color: isDark ? 'white' : 'slate.900' }}>
                                    {t('adminDashboard')}
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                {t('adminDashboardSubtitle')}
                            </Typography>
                        </Box>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 4,
                                display: 'flex',
                                gap: 2,
                                alignItems: 'center',
                                bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: isDark ? '1px solid rgba(255,255,255,0.05)' : 'none'
                            }}
                        >
                            <TextField
                                type="date"
                                label={t('startDate')}
                                value={dateRange.startDate}
                                onChange={(e) => handleDateChange('startDate', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                sx={{ width: 150 }}
                            />
                            <TextField
                                type="date"
                                label={t('endDate')}
                                value={dateRange.endDate}
                                onChange={(e) => handleDateChange('endDate', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                sx={{ width: 150 }}
                            />
                        </Paper>
                    </Box>

                    {/* Quick Metrics */}
                    <SectionHeader title={t('userActivity')} icon={<PeopleIcon />} isDark={isDark} />
                    <Grid container spacing={3} mb={6}>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title={t('totalUsers')}
                                value={report?.userActivity?.totalUsers}
                                icon={<PeopleIcon />}
                                color={theme.palette.primary.main}
                                isDark={isDark}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title={t('registrations')}
                                value={report?.userActivity?.newRegistrations}
                                subValue={t('last30Days')}
                                icon={<LoginIcon />}
                                color={theme.palette.secondary.main}
                                isDark={isDark}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title={t('active')}
                                value={report?.userActivity?.activeUsers}
                                icon={<SuccessIcon />}
                                color="#10B981"
                                isDark={isDark}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title={t('deactivated')}
                                value={report?.userActivity?.deactivatedUsers}
                                icon={<ErrorIcon />}
                                color="#EF4444"
                                isDark={isDark}
                            />
                        </Grid>
                    </Grid>

                    {/* Financial Performance */}
                    <SectionHeader title={t('financialPerformance')} icon={<BalanceIcon />} isDark={isDark} />
                    <Grid container spacing={4} mb={6}>
                        <Grid item xs={12} md={8}>
                            <Paper sx={{ p: 4, borderRadius: 5, bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'white' }}>
                                <Typography variant="h6" fontWeight="800" mb={4}>{t('incomeVsExpense')}</Typography>
                                <Box sx={{ height: 350, width: '100%' }}>
                                    <ResponsiveContainer>
                                        <AreaChart data={financeData}>
                                            <defs>
                                                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                                            <ChartTooltip />
                                            <Area type="monotone" dataKey="income" stroke="#10B981" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
                                            <Area type="monotone" dataKey="expense" stroke="#EF4444" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={3} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box display="flex" flexDirection="column" gap={3}>
                                <StatCard
                                    title={t('totalIncome')}
                                    value={`$${report?.financialPerformance?.platformTotalIncome.toLocaleString()}`}
                                    icon={<IncomeIcon />}
                                    color="#10B981"
                                    isDark={isDark}
                                />
                                <StatCard
                                    title={t('totalExpenses')}
                                    value={`$${report?.financialPerformance?.platformTotalExpenses.toLocaleString()}`}
                                    icon={<ExpenseIcon />}
                                    color="#EF4444"
                                    isDark={isDark}
                                />
                                <StatCard
                                    title={t('platformBalance')}
                                    value={`$${report?.financialPerformance?.platformNetBalance.toLocaleString()}`}
                                    icon={<BalanceIcon />}
                                    color={theme.palette.primary.main}
                                    isDark={isDark}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Categories & Security */}
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 4, borderRadius: 5, height: '100%', bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'white' }}>
                                <Typography variant="h6" fontWeight="800" mb={4}>{t('topExpenseCategories')}</Typography>
                                <Box sx={{ height: 300, width: '100%' }}>
                                    <ResponsiveContainer>
                                        <BarChart data={categoryData} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} width={120} />
                                            <ChartTooltip cursor={{ fill: 'transparent' }} />
                                            <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={25}>
                                                {categoryData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 4, borderRadius: 5, height: '100%', bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'white' }}>
                                <Box display="flex" alignItems="center" gap={1} mb={4}>
                                    <SecurityIcon color="primary" />
                                    <Typography variant="h6" fontWeight="800">{t('securityLogs')}</Typography>
                                </Box>
                                <Grid container spacing={2}>
                                    {[
                                        { label: t('loginAttempts'), value: report?.securityAndLogs?.totalLoginAttempts },
                                        { label: t('uniqueUsers'), value: report?.securityAndLogs?.uniqueUsersLoggedIn },
                                        { label: t('successRate'), value: `${((report?.securityAndLogs?.successfulLogins / report?.securityAndLogs?.totalLoginAttempts) * 100 || 0).toFixed(1)}%` },
                                        { label: t('failureRate'), value: `${((report?.securityAndLogs?.failedLogins / report?.securityAndLogs?.totalLoginAttempts) * 100 || 0).toFixed(1)}%` },
                                    ].map((log, idx) => (
                                        <Grid item xs={6} key={idx}>
                                            <Box p={2.5} borderRadius={4} bgcolor={isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)'} border={isDark ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'}>
                                                <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>{log.label}</Typography>
                                                <Typography variant="h5" fontWeight="800" mt={0.5}>{log.value || 0}</Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Box>
    );
};

export default AdminDashboard;