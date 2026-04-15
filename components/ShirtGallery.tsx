'use client';

import { Box } from '@mui/material';
import { useState } from 'react';

type Props = {
  images: { url: string }[];
  fallback?: string;
};

export function ShirtGallery({ images, fallback }: Props) {
  const [index, setIndex] = useState(0);

  const allImages =
    images.length > 0 ? images : fallback ? [{ url: fallback }] : [];

  const current = allImages[index]?.url;

  return (
    <Box>
      {/* 🖼️ Imagem principal */}
      <Box
        component="img"
        src={current}
        alt="Camisa"
        sx={{
          width: '100%',
          borderRadius: 2,
          mb: 2,
        }}
      />

      {/* Thumbnails */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
        }}
      >
        {allImages.map((img, i) => (
          <Box
            key={i}
            component="img"
            src={img.url}
            onClick={() => setIndex(i)}
            sx={{
              width: 70,
              height: 70,
              objectFit: 'cover',
              borderRadius: 1,
              cursor: 'pointer',
              border: i === index ? '2px solid #FFD700' : '2px solid transparent',
              opacity: i === index ? 1 : 0.6,
              transition: '0.2s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}