import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Regnskap for bygg i Stavanger | MAXAI",
  description:
    "Spesialisert regnskap for bygg og entreprenor i Stavanger. Fa kontroll pa prosjektokonomi, MVA og marginer."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
