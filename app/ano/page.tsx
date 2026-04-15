"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from '@/services/supabase';
import { ShirtCard } from "@/components/ShirtCard";
import { Container, Typography, Box, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AnoPage() {
  const [shirts, setShirts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [year, setYear] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const supabase = getSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("shirts").select(`
          *,
          shirt_images:shirt_images (*)
        `);

      setShirts(data || []);
      setFiltered(data || []);
    }

    fetchData();
  }, []);

  // 🎯 filtro por ano
  useEffect(() => {
    let result = shirts;

    if (year) {
      result = result.filter((s) => s.year === year);
    }

    if (status) {
      result = result.filter((s) => s.status === status);
    }

    setFiltered(result);
  }, [year, status, shirts]);

  // 📅 anos únicos (pra timeline + select)
  const years = Array.from(new Set(shirts.map((s) => s.year))).sort(
    (a, b) => b - a,
  );

  return (
    <main>
      <Container maxWidth="md">
        {/* Header padrão */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h1" sx={{ mt: 2 }}>
            Veja por ano
          </Typography>

          <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
            Explore todo o acervo por temporada
          </Typography>
        </Box>

        {/* 🔎 Filtro */}
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr", // mobile → empilhado
              sm: "1fr 1fr", // desktop → lado a lado
            },
          }}
        >
          {/* Ano */}
          <Select<string>
            fullWidth
            value={year?.toString() ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setYear(value === "" ? null : Number(value));
            }}
            displayEmpty
          >
            <MenuItem value="">Todos os anos</MenuItem>

            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>

          {/* Status */}
          <Select
            fullWidth
            value={status ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setStatus(value === "" ? null : String(value));
            }}
            displayEmpty
          >
            <MenuItem value="">Todas as camisas</MenuItem>
            <MenuItem value="owned">Já tenho</MenuItem>
            <MenuItem value="wishlist">Tenho interesse</MenuItem>
          </Select>
        </Box>

        {/* 🧭 Timeline */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Linha do tempo
          </Typography>

          <Box sx={{ display: "flex", overflowX: "auto", gap: 2 }}>
            {years.map((y) => {
              const supplier = shirts.find((s) => s.year === y)?.supplier;

              return (
                <Box
                  key={y}
                  onClick={() => router.push(`/ano/${y}`)}
                  sx={{
                    minWidth: 100,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: year === y ? "#FFD700" : "#f5f5f5",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {y}
                  </Typography>

                  <Typography variant="caption">{supplier || "—"}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <Box
            key={year ?? "all"} // 👈 MUITO IMPORTANTE
            sx={{
              mt: 4,
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr",
              },
            }}
          >
            {(year === null
              ? [...filtered].sort((a, b) => b.year - a.year)
              : filtered
            ).map((shirt) => (
              <motion.div
                key={shirt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ShirtCard shirt={shirt} />
              </motion.div>
            ))}
          </Box>
        </AnimatePresence>
      </Container>
    </main>
  );
}
