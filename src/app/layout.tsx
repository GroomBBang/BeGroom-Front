// app/layout.tsx
import Header from "@/shared/components/layout/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}

