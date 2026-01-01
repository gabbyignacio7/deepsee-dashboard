import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeepSee AI - Priority Dashboard",
  description: "Product Management Priority Scoring Dashboard for DeepSee AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
