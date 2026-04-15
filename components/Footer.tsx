'use client';

import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 4,
        backgroundColor: 'primary.main', // preto
        color: 'primary.contrastText',   // branco
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: 2,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          {/* 🧾 Branding */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Meu Acervo
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
              Coleção pessoal de camisas do ABC 👕
            </Typography>
          </Box>

          {/* 🔗 Links */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <MuiLink
              component={Link}
              href="/"
              underline="none"
              color="inherit"
            >
              Início
            </MuiLink>

            <MuiLink
              component={Link}
              href="/ano"
              underline="none"
              color="inherit"
            >
              Por ano
            </MuiLink>

            <MuiLink
              component={Link}
              href="/wishlist"
              underline="none"
              color="inherit"
            >
              Wishlist
            </MuiLink>
          </Box>
        </Box>

        {/* 📌 Bottom */}
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} - @Acervoabcdista. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}