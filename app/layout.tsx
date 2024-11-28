// app/layout.tsx
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <title>BJJ Techniques</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
