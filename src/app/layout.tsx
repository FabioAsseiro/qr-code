import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import './style.css'

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR code generation",
  description: "QR code criado por fabio na aula da Larrisa Kitch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins}`}>
        {children}
      </body>
    </html>
  );
}
