'use client';

import { Box } from '@mui/material';

export function WhatsAppButton() {
  const handleClick = () => {
    const msg = encodeURIComponent(
      'Olá! Vim pelo site e tenho interesse em uma camisa 👕'
    );

    window.open(`https://wa.me/5584998223869?text=${msg}`, '_blank');
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: '50%',
        backgroundColor: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        zIndex: 999,
        transition: 'transform 0.2s',

        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <img
        src="/whatsapp-icon.png"
        alt="WhatsApp"
        style={{ width: 60, height: 60 }}
      />
    </Box>
  );
}