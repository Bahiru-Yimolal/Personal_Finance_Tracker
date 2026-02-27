import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InsightsIcon from '@mui/icons-material/Insights';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useTranslation } from '../hooks/useTranslation';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, isDark }) => (
  <Box className={`flex items-start gap-6 p-8 rounded-[2rem] transition-all duration-500 hover:bg-blue-600/5 group ${isDark ? '' : 'bg-white border border-slate-100 shadow-sm'}`}>
    <Box className="bg-blue-600/10 p-4 rounded-2xl text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
      {icon}
    </Box>
    <Box>
      <Typography variant="h5" className="font-bold mb-2 tracking-tight text-xl">
        {title}
      </Typography>
      <Typography className={`${isDark ? 'text-gray-400' : 'text-slate-600'} leading-relaxed text-base`}>
        {description}
      </Typography>
    </Box>
  </Box>
);

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useSelector((state) => state.ui.theme);
  const isDark = theme === 'dark';

  const { onRegisterOpen, onLoginOpen } = useOutletContext();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0f1c] text-white' : 'bg-slate-50 text-slate-900'} selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300`}>
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] ${isDark ? 'bg-blue-600/10' : 'bg-blue-400/10'} rounded-full blur-[120px]`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] ${isDark ? 'bg-purple-600/10' : 'bg-purple-400/10'} rounded-full blur-[120px]`} />
      </div>

      <Container maxWidth="lg" className="relative pt-8 md:pt-24 pb-16 md:pb-32 px-6">
        {/* Hero Section */}
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center" className="mb-24 md:mb-40">
          <Grid item xs={12} md={7}>
            <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-left duration-1000">
              <Box className={`inline-block py-1.5 px-4 rounded-full ${isDark ? 'bg-blue-600/10 border-blue-500/20 text-blue-400' : 'bg-blue-600/5 border-blue-600/10 text-blue-600'} border font-semibold text-[10px] md:text-xs tracking-[0.2em] uppercase`}>
                {t('heroBadge')}
              </Box>
              <Typography
                variant="h1"
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.2] md:leading-[1.1] tracking-tighter"
                sx={{
                  background: isDark ? 'linear-gradient(to right, #fff, #94a3b8)' : 'linear-gradient(to right, #000, #475569)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {t('heroTitle')} <br />
                <span className="text-blue-600">{t('heroTitleHighlight')}</span> {t('heroTitleEnd')}
              </Typography>
              <Typography className={`text-base md:text-xl lg:text-2xl ${isDark ? 'text-gray-400' : 'text-slate-600'} max-w-2xl leading-relaxed`}>
                {t('heroSubtitle')}
              </Typography>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  variant="contained"
                  size="large"
                  onClick={onRegisterOpen}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl normal-case text-lg font-semibold shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                >
                  {t('getStarted')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={onLoginOpen}
                  className={`${isDark ? 'border-white/20 text-white hover:bg-white/5' : 'border-slate-200 text-slate-700 hover:bg-slate-100'} px-8 py-4 rounded-xl normal-case text-lg font-semibold transition-all`}
                >
                  {t('login')}
                </Button>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={5} className="relative hidden md:flex items-center justify-center">
            <div className="relative z-10 animate-in fade-in zoom-in duration-1000 delay-300">
              {/* Mockup / Abstract Visual */}
              <div className={`bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-[3rem] p-6 backdrop-blur-md border ${isDark ? 'border-white/10' : 'border-blue-200/50'} shadow-2xl`}>
                <div className={`${isDark ? 'bg-[#0f172a]' : 'bg-white'} rounded-[2.5rem] overflow-hidden border ${isDark ? 'border-white/5' : 'border-blue-50'} shadow-inner p-8 lg:p-10 aspect-square flex items-center justify-center transition-transform duration-700 hover:rotate-3`}>
                  <TrendingUpIcon sx={{ fontSize: { md: 140, lg: 180 }, color: '#2563eb', filter: isDark ? 'drop-shadow(0 0 30px rgba(37, 99, 235, 0.4))' : 'none' }} />
                </div>
              </div>
              {/* Floating Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            </div>
          </Grid>
        </Grid>

        {/* Features Section - Parallel Column Layout */}
        <div className="py-24 md:py-40 relative">
          <Grid container spacing={{ xs: 8, md: 12 }}>
            <Grid item xs={12} md={5}>
              <div className="sticky top-32 space-y-6 md:space-y-8">
                <Typography variant="h2" className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  {t('featuresTitle')}
                </Typography>
                <div className="w-30 h-2 bg-blue-600 rounded-full" />
                <Typography className={`${isDark ? 'text-gray-400' : 'text-slate-600'} text-lg md:text-xl lg:text-2xl leading-relaxed max-w-md`}>
                  {t('featuresSubtitle')}
                </Typography>
                <Box mt={4}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onRegisterOpen}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl normal-case font-bold"
                  >
                    {t('register')}
                  </Button>
                </Box>
              </div>
            </Grid>

            <Grid item xs={12} md={7}>
              <div className="space-y-4 md:space-y-6">
                <FeatureCard
                  icon={<AccountBalanceWalletIcon sx={{ fontSize: 32 }} />}
                  title={t('feature1Title')}
                  description={t('feature1Desc')}
                  isDark={isDark}
                />
                <FeatureCard
                  icon={<InsightsIcon sx={{ fontSize: 32 }} />}
                  title={t('feature2Title')}
                  description={t('feature2Desc')}
                  isDark={isDark}
                />
                <FeatureCard
                  icon={<SecurityIcon sx={{ fontSize: 32 }} />}
                  title={t('feature3Title')}
                  description={t('feature3Desc')}
                  isDark={isDark}
                />
              </div>
            </Grid>
          </Grid>
        </div>

        {/* Footer Minimal */}
        <div className={`mt-40 pt-16 border-t ${isDark ? 'border-white/10 text-gray-500' : 'border-slate-200 text-slate-500'} text-center text-xs md:text-sm font-medium tracking-widest uppercase`}>
          <p>{t('footer')}</p>
        </div>
      </Container>
    </div>
  );
}

export default Home;
