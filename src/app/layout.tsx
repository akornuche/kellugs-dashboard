import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kellugs OS",
  description: "Company Admin Dashboard & CMS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
