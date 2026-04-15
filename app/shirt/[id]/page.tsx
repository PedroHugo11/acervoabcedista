import { supabase } from "@/services/supabase";
import { Container, Typography, Box, Breadcrumbs } from "@mui/material";
import Link from "next/link";
import { ShirtGallery } from "@/components/ShirtGallery";
import { Chip } from "@mui/material";

export default async function Page({ params }: any) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const { data: shirt } = await supabase
    .from("shirts")
    .select(
      `
      *,
      shirt_images:shirt_images (*)
    `,
    )
    .eq("id", id)
    .single();

  if (!shirt) {
    return <div>Camisa não encontrada</div>;
  }

  return (
    <main>
      <Container maxWidth="md">
        {/* 🧭 Breadcrumb */}
        <Breadcrumbs sx={{ mb: 2, mt: 2 }} aria-label="breadcrumb">
          <Link href="/ano" style={{ textDecoration: "none" }}>
            Veja por ano
          </Link>

          <Link href={`/ano/${shirt.year}`} style={{ textDecoration: "none" }}>
            {shirt.year}
          </Link>

          <Typography color="text.primary">{shirt.name}</Typography>
        </Breadcrumbs>

        {/* 🧾 Conteúdo */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h1" sx={{ mt: 2 }}>
            {shirt.name}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
            {shirt.year} {shirt.supplier && `• ${shirt.supplier}`}
          </Typography>
        </Box>

        {/* 🖼️ Imagem principal */}
        <ShirtGallery
          images={shirt.shirt_images || []}
          fallback={shirt.image_url}
        />

        {/* 🧩 Infos extras */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">Tipo: {shirt.type}</Typography>

          <Chip
            label={shirt.status === "owned" ? "Já tenho" : "Estou à procura"}
            sx={{
              mt: 1,
              backgroundColor: shirt.status === "owned" ? "#4caf50" : "#ff9800",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        </Box>
      </Container>
    </main>
  );
}
