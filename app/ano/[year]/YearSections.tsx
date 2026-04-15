'use client';

import { ShirtCard } from '@/components/ShirtCard';
import { Box, Typography, Divider } from '@mui/material';

export function YearSections({ shirts }: { shirts: any[] }) {
  const game = shirts.filter((s) => s.type === 'jogo');
  const training = shirts.filter((s) => s.type === 'treino');
  const fan = shirts.filter((s) => s.type === 'torcedor');

  const renderSection = (title: string, data: any[]) => {
    if (!data.length) return null;

    return (
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
            },
          }}
        >
          {data.map((shirt) => (
            <ShirtCard key={shirt.id} shirt={shirt} />
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <>
      {renderSection('Camisas de Jogo', game)}
      {renderSection('Camisas de Treino', training)}
      {renderSection('Camisas de Torcedor', fan)}
    </>
  );
}