import { supabase } from "@/services/supabase";
import { ShirtCard } from "@/components/ShirtCard";
import Link from "next/link";
import {
  Container,
  Typography,
  Box,
  Divider,
  Breadcrumbs,
} from "@mui/material";

export default async function Page({ params }: any) {
  const resolvedParams = await params;
  const year = Number(resolvedParams.year);

  const { data: shirts } = await supabase
    .from("shirts")
    .select(
      `
      *,
      shirt_images:shirt_images (*)
    `,
    )
    .eq("year", year);

  const game = shirts?.filter((s) => s.type === "jogo") || [];
  const training = shirts?.filter((s) => s.type === "treino") || [];
  const fan = shirts?.filter((s) => s.type === "torcedor") || [];

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
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr",
            },
          }}
        >
          {data.map((shirt: any) => (
            <ShirtCard key={shirt.id} shirt={shirt} />
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <main>
      <Container maxWidth="md">
        {/* Header padrão */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h1" sx={{ mt: 2 }}>
            Temporada {year}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
            Veja todas as camisas desse ano
          </Typography>
        </Box>

        {/* Seções */}
        <Breadcrumbs sx={{ mb: 0 }}>
          <Link
            href="/ano"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            Veja por ano
          </Link>

          <Typography color="text.primary">{year}</Typography>
        </Breadcrumbs>
        {renderSection("Camisas de Jogo", game)}
        {renderSection("Camisas de Treino", training)}
        {renderSection("Camisas de Torcedor", fan)}

        {/* Empty state */}
        {shirts?.length === 0 && (
          <Box sx={{ mt: 6, textAlign: "center", opacity: 0.7 }}>
            <Typography variant="h6">Nenhuma camisa cadastrada 😕</Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>
              Esse ano ainda não tem itens no acervo.
            </Typography>
          </Box>
        )}
      </Container>
    </main>
  );
}
