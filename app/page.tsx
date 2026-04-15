"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { YearFilter } from "@/features/home/YearFilter";
import { HomePreview } from "@/features/home/HomePreview";
import { Box, Button, Container, Typography } from "@mui/material";
import { ShirtCard } from "@/components/ShirtCard";
import { getSupabaseClient } from '@/services/supabase';

export default function Home() {
  const [year, setYear] = useState<number | null>(null);
  const [shirts, setShirts] = useState<any[]>([]);
  const router = useRouter();
  const supabase = getSupabaseClient();

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("shirts")
        .select("*")
        .eq("status", "wishlist")
        .eq("priority", "very_high")
        .limit(2);

      setShirts(data || []);
    }

    fetchData();
  }, []);

  {
    shirts.length === 0 ? (
      <Typography sx={{ mt: 2, opacity: 0.7 }}>
        Nenhuma camisa de interesse ainda
      </Typography>
    ) : (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
        }}
      >
        {shirts.map((shirt) => (
          <ShirtCard key={shirt.id} shirt={shirt} />
        ))}
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
      }}
    >
      <section>
        <header>
          <img
            style={{
              backgroundImage: "url(/background.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "230px",
              border: "none",
              marginTop: "-1px",
            }}
          />
        </header>

        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h1" sx={{ mt: 2 }}>
              Meu acervo
            </Typography>
          </Box>

          <YearFilter year={year} setYear={setYear} />
          <HomePreview year={year} />

          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h1" sx={{ mt: 4, mb: 4 }}>
              Camisas de Interesse
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr", // mobile → 1 por linha
                  sm: "1fr 1fr", // tablet → 2 por linha (opcional)
                  md: "1fr 1fr", // desktop → 2 por linha
                },
                gap: 2,
              }}
            >
              {shirts.map((shirt) => (
                <ShirtCard key={shirt.id} shirt={shirt} />
              ))}
            </Box>

            <Button
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => router.push("/wishlist")}
            >
              Ver minha lista de desejo completa
            </Button>
          </Box>
        </Container>
      </section>
    </Box>
  );
}
