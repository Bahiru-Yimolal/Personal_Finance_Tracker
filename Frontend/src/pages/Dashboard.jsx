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
  TextField,
  MenuItem,
  Divider,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import {
  TrendingUp as IncomeIcon,
  TrendingDown as ExpenseIcon,
  AccountBalanceWallet as BalanceIcon,
  Login as LoginIcon,
  ErrorOutline as FailedIcon,
  AccessTime as TimeIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useSelector } from 'react-redux';
import { useTranslation } from '../hooks/useTranslation';
import { useGetLoginInfoQuery } from '../features/user/redux/userApiSlice';
import { useGetTransactionSummaryQuery } from '../features/transactions/redux/transactionApiSlice';

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

const Dashboard = () => {
  const { t } = useTranslation();
  const isDark = useSelector((state) => state.ui.theme === 'dark');
  const [dateRange, setDateRange] = React.useState({
    startDate: '',
    endDate: '',
  });

  const { data: loginResponse, isLoading: loginLoading } = useGetLoginInfoQuery();
  const { data: summaryResponse, isLoading: summaryLoading } = useGetTransactionSummaryQuery(dateRange);

  const loginInfo = loginResponse?.login_info;
  const summary = summaryResponse?.data;
  const isLoading = loginLoading || summaryLoading;

  const StatCard = ({ title, value, subValue, icon, color, delay = 0 }) => (
    <Fade in timeout={800 + delay}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 5,
          height: '100%',
          bgcolor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'white',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease',
          '&:hover': { transform: 'translateY(-5px)' },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 3,
              bgcolor: `${color}15`,
              color: color,
              display: 'flex',
            }}
          >
            {React.cloneElement(icon, { fontSize: 'medium' })}
          </Box>
        </Box>
        <Typography variant="caption" fontWeight="700" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="900" sx={{ my: 1, color: isDark ? 'white' : 'slate.900' }}>
          {value}
        </Typography>
        {subValue && (
          <Typography variant="body2" color="text.secondary">
            {subValue}
          </Typography>
        )}
      </Paper>
    </Fade>
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  const barData = [
    { name: t('income'), amount: summary?.totalIncome || 0, fill: '#10b981' },
    { name: t('expense'), amount: summary?.totalExpenses || 0, fill: '#ef4444' },
  ];

  const pieData = summary?.categories || [];

  return (
    <Box sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 0 } }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
        <Box>
          <Typography variant="h4" fontWeight="900" sx={{ color: isDark ? 'white' : 'slate.900', letterSpacing: -1 }}>
            {t('welcomeBack')}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('dashboardSubtitle')}
          </Typography>
        </Box>

        {/* Date Filters */}
        <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            type="date"
            size="small"
            label={t('startDate')}
            value={dateRange.startDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
            InputLabelProps={{ shrink: true }}
            sx={{ bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'white' }}
          />
          <TextField
            type="date"
            size="small"
            label={t('endDate')}
            value={dateRange.endDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
            InputLabelProps={{ shrink: true }}
            sx={{ bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'white' }}
          />
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Financial Summary */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title={t('balance')}
            value={`$${summary?.balance?.toLocaleString() || '0'}`}
            icon={<BalanceIcon />}
            color="#8b5cf6"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title={t('income')}
            value={`+$${summary?.totalIncome?.toLocaleString() || '0'}`}
            icon={<IncomeIcon />}
            color="#10b981"
            delay={100}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title={t('expense')}
            value={`-$${summary?.totalExpenses?.toLocaleString() || '0'}`}
            icon={<ExpenseIcon />}
            color="#ef4444"
            delay={200}
          />
        </Grid>

        {/* Login Stats */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'white',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <LoginIcon color="primary" />
              <Typography variant="h6" fontWeight="800">
                {t('loginStats')}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">{t('successLogins')}</Typography>
                <Typography variant="h5" fontWeight="900" color="success.main">{loginInfo?.success_count || 0}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">{t('failedLogins')}</Typography>
                <Typography variant="h5" fontWeight="900" color="error.main">{loginInfo?.failed_count || 0}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2, opacity: 0.1 }} />
            <Stack spacing={1.5}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">{t('lastLogin')}:</Typography>
                <Typography variant="body2" fontWeight="600">
                  {loginInfo?.last_successful_login ? new Date(loginInfo.last_successful_login.login_at).toLocaleString() : 'N/A'}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">{t('lastFailedLogin')}:</Typography>
                <Typography variant="body2" fontWeight="600" color="error.main">
                  {loginInfo?.last_failed_login ? new Date(loginInfo.last_failed_login.login_at).toLocaleString() : 'N/A'}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Performance Chart (Income vs Expense) */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              height: '100%',
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'white',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography variant="h6" fontWeight="800" mb={3}>
              {t('incomeVsExpense')}
            </Typography>
            <Box sx={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: isDark ? '#94a3b8' : '#64748b' }} />
                  <YAxis hide />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Expense Breakdown Pie Chart */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'white',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography variant="h6" fontWeight="800" mb={3}>
              {t('expenseByCategory')}
            </Typography>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="total"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: isDark ? '#1e293b' : '#fff',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  {pieData.length > 0 ? pieData.map((cat, index) => (
                    <Box key={cat.name} display="flex" justifyContent="space-between" alignItems="center">
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: COLORS[index % COLORS.length] }} />
                        <Typography variant="body2" fontWeight="600">{cat.name}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" fontWeight="700">
                        ${cat.total.toLocaleString()}
                      </Typography>
                    </Box>
                  )) : (
                    <Box py={4} textAlign="center">
                      <Typography variant="body2" color="text.secondary">{t('noData')}</Typography>
                    </Box>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
