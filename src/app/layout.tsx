import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "FUTA Bus Lines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="text-neutral-900 bg-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}






