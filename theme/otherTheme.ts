import { createTheme } from '@mui/material/styles';

export const otherTheme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#0066CC', // azul RN
      contrastText: '#ffffff',
    },

    secondary: {
      main: '#00A651', // verde RN
      contrastText: '#ffffff',
    },

    error: {
      main: '#C8102E', // vermelho RN
    },

    background: {
      default: '#ffffff',
      paper: '#f4f6f8',
    },

    text: {
      primary: '#1a1a1a',
      secondary: '#555',
    },
  },

  typography: {
    fontFamily: 'Inter, sans-serif',

    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1a1a1a',
          borderBottom: '1px solid #eee',
          boxShadow: 'none',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});