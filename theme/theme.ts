import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#161616', // preto
      contrastText: '#ffffff',
    },

    secondary: {
      main: '#FFD700', // amarelo
      contrastText: '#000000',
    },

    background: {
      default: '#ffffff',
      paper: '#f9f9f9',
    },

    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },

  typography: {
    fontFamily: 'Inter, sans-serif',

    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },

    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },

    button: {
      textTransform: 'none', // evita CAPS
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12, // padrão moderno
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#000000',
          borderBottom: '1px solid #eee',
          boxShadow: 'none',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});