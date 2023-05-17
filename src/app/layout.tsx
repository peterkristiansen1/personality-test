import "./globals.css";

export const metadata = {
  title: "Introvert / Extrovert Test",
  description: "A personality test based on Big Five traits",
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
