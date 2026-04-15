"use client";

import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import { Shirt } from "@/types/shirt";
import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";

type Props = {
  shirt: Shirt & {
    shirt_images?: { url: string }[];
  };
};

export function ShirtCard({ shirt }: Props) {
  const images = shirt.shirt_images || [];
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlersSwipeable = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  const currentImage = images[index]?.url || shirt.image_url || "/fallback.jpg";

  return (
    <article>
      <Card
        onClick={() => router.push(`/shirt/${shirt.id}`)}
        sx={{
          overflow: "hidden",
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box sx={{ position: "relative" }} {...handlersSwipeable}>
          <CardMedia
            component="img"
            height="500"
            image={currentImage}
            alt={shirt.name}
            sx={{
              transition: "opacity 0.3s ease-in-out",
            }}
          />

          {/* Botões do slider */}
          {images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 5,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "#fff",
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>

              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 5,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "#fff",
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </>
          )}

          {/* Badge */}
          {shirt.status === "wishlist" && (
            <Chip
              label={
                shirt.priority === "very_high"
                  ? "🔥 Muito desejada"
                  : shirt.priority === "high"
                    ? "🔥 Desejada"
                    : shirt.priority === "medium"
                      ? "Tenho interesse"
                      : "Estou aberto a conversas"
              }
              size="small"
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                backgroundColor:
                  shirt.priority === "very_high"
                    ? "#FFD700"
                    : shirt.priority === "high"
                      ? "#05d220"
                      : shirt.priority === "medium"
                        ? "#5caef1"
                        : "#9e9e9e",
                color: "#000",
                fontWeight: 600,
              }}
            />
          )}
        </Box>

        <CardContent>
          <Typography variant="subtitle1" fontWeight={600}>
            {shirt.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {shirt.year} {shirt.supplier && `• ${shirt.supplier}`}
          </Typography>
        </CardContent>
      </Card>
    </article>
  );
}
