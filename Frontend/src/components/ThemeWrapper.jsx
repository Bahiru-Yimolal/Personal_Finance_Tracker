import React, { useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';

const ThemeWrapper = ({ children }) => {
    const mode = useSelector((state) => state.ui.theme);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: '#3b82f6', // blue-500
                    },
                    secondary: {
                        main: '#8b5cf6', // purple-500
                    },
                    background: {
                        default: mode === 'light' ? '#f8fafc' : '#0a0f1c',
                        paper: mode === 'light' ? '#ffffff' : '#0f172a',
                    },
                },
                typography: {
                    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
                    h1: { fontWeight: 800 },
                    h2: { fontWeight: 700 },
                    h3: { fontWeight: 700 },
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: 600,
                            },
                        },
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                borderRadius: '16px',
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ThemeWrapper;
