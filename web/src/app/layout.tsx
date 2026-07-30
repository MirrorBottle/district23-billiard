import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "District 23",
  description: "Restaurant & Cafe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Kristi%7cPoppins:400,500,600,700%7cYeseva+One&display=swap"
        />
        <link rel="stylesheet" href="/css/libraries.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
