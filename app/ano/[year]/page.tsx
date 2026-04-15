import { supabase } from "@/services/supabase";
import { YearSections } from '@/app/ano/[year]/YearSections';
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

        <YearSections shirts={shirts || []} />

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
