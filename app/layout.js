import "./globals.css";

export const metadata = {
  title: "NNH C Compiler",
  description: "Professional VS Code Style C Compiler",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
