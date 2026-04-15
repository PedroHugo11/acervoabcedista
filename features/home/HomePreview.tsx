"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from '@/services/supabase';
import { ShirtCard } from "@/components/ShirtCard";
import { Button, Typography, Box, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Props = {
  year: number | null;
};

export function HomePreview({ year }: Props) {
  const [shirts, setShirts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = getSupabaseClient();

  useEffect(() => {
    if (!year) {
      setShirts([]); // 👈 limpa os cards
      return;
    }

    async function fetchData() {
      setLoading(true);

      const { data } = await supabase
        .from("shirts")
        .select(
          `
          *,
          shirt_images:shirt_images (*)
        `,
        )
        .eq("year", year);
      let filtered: any[] = [];

      if (data) {
        const jogo = data.filter((s) => s.type === "jogo");

        if (jogo.length > 0) {
          filtered = jogo;
        } else {
          const outros = data.filter(
            (s) => s.type === "treino" || s.type === "torcedor",
          );
          filtered = outros;
        }
      }

      // só limita depois da lógica
      setShirts(filtered.slice(0, 2));

      setShirts(data || []);
      setLoading(false);
    }

    fetchData();
  }, [year]);

  console.log(shirts);

  // 🧩 Skeleton de card
  const SkeletonCard = () => (
    <Box>
      <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
      <Skeleton variant="text" sx={{ mt: 1 }} />
      <Skeleton variant="text" width="60%" />
    </Box>
  );

  return (
    <section>
      {/* 🟡 Nenhum ano selecionado */}
      {!year && (
        <Box sx={{ mt: 4, textAlign: "center", opacity: 0.7 }}>
          <Typography variant="h6">Escolha um ano 👕</Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            Veja as camisas do seu acervo por temporada
          </Typography>
        </Box>
      )}

      {/* 🔄 Loading com skeleton */}
      {loading && (
        <Box sx={{ mt: 3, display: "grid", gap: 2 }}>
          <SkeletonCard />
          <SkeletonCard />
        </Box>
      )}

      {/* 📭 Sem dados */}
      {year && !loading && shirts.length === 0 && (
        <Box sx={{ mt: 4, textAlign: "center", opacity: 0.8 }}>
          <Typography variant="h6">Nada por aqui ainda 👀</Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            Esse ano ainda não entrou pro acervo.
          </Typography>
        </Box>
      )}

      {/* ✅ Com dados */}
      {shirts.length > 0 && (
        <>
          <Box
            sx={{
              mt: 3,
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr", // mobile → 1 por linha
                sm: "1fr 1fr", // tablet → 2 por linha (opcional)
                md: "1fr 1fr", // desktop → 2 por linha
              },
            }}
          >
            {shirts.map((shirt, index) => (
              <motion.div
                key={shirt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ShirtCard shirt={shirt} />
              </motion.div>
            ))}
          </Box>

          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            onClick={() => router.push(`/ano/${year}`)}
          >
            Ver mais
          </Button>
        </>
      )}
    </section>
  );
}
