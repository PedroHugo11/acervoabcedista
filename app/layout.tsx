import { ThemeRegistry } from '@/theme/ThemeRegistry';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function RootLayout({ children }: any) {
  return (
    <html lang="pt-BR">
      <body style={{margin: "0"}}>
        <ThemeRegistry>
          <header>
            <Navbar />
          </header>

          <main>{children}</main>

          <Footer />
          <WhatsAppButton />
        </ThemeRegistry>
      </body>
    </html>
  );
}