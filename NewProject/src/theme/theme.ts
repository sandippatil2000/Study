import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#C62828',
      light: '#EF5350',
      dark: '#8E0000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#C62828',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    error: {
      main: '#C62828',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 12,
    h1: { fontWeight: 700, fontSize: '1.8rem' },
    h2: { fontWeight: 700, fontSize: '1.5rem' },
    h3: { fontWeight: 600, fontSize: '1.25rem' },
    h4: { fontWeight: 600, fontSize: '1.1rem' },
    h5: { fontWeight: 600, fontSize: '0.95rem' },
    h6: { fontWeight: 600, fontSize: '0.85rem' },
    body1: { fontSize: '0.8rem' },
    body2: { fontSize: '0.75rem' },
    subtitle1: { fontSize: '0.8rem' },
    subtitle2: { fontSize: '0.75rem' },
    caption: { fontSize: '0.7rem' },
    button: { fontSize: '0.78rem' },
    overline: { fontSize: '0.68rem' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
        },
      },
    },
  },
});

export default theme;
