import React from "react";

export const metadata = {
  title: "Sparse Gaming Division",
  description: "Official HQ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#000" }}>
        {children}
      </body>
    </html>
  );
}
