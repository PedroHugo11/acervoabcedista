import { supabase } from "@/services/supabase";
import { ShirtCard } from "@/components/ShirtCard";
import { Container, Typography, Box } from "@mui/material";

export default async function Page() {
  const { data: shirts } = await supabase
    .from("shirts")
    .select(`
      *,
      shirt_images:shirt_images (*)
    `)
    .neq("team", "ABC");

  return (
    <main>
      <Container maxWidth="md">
        {/* Header padrão */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h1" sx={{ mt: 2 }}>
            Outras camisas
          </Typography>

          <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
            Camisas fora do acervo do ABC
          </Typography>
        </Box>

        {/* Conteúdo */}
        {shirts && shirts.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
            }}
          >
            {shirts.map((shirt: any) => (
              <ShirtCard key={shirt.id} shirt={shirt} />
            ))}
          </Box>
        ) : (
          <Box sx={{ mt: 6, textAlign: "center", opacity: 0.7 }}>
            <Typography variant="h6">
              Nenhuma disponível no momento 👕
            </Typography>
          </Box>
        )}
      </Container>
    </main>
  );
}