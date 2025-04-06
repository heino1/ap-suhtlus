import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Arvutiprogrammid ja nende omavaheline suhtlemine',
  description: 'Loengumaterjalid äriinformaatika kursusel logistika 5. aasta tudengitele',
};

export default function RootLayout({ children }) {
  return (
    <html lang="et" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
