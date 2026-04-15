'use client';

import { ThemeProvider } from '@mui/material';
import { theme } from '@/theme/theme';
import { otherTheme } from '@/theme/otherTheme';
import { usePathname } from 'next/navigation';

export function ThemeRegistry({ children }: any) {
  const pathname = usePathname();
  const isOther = pathname.startsWith('/acervo/outros');

  return (
    <ThemeProvider theme={isOther ? otherTheme : theme}>
      {children}
    </ThemeProvider>
  );
}