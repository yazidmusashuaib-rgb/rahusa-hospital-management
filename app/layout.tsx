import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RAHUSA CLINIC",
  description: "Hospital Management System"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#f5f7fb", color: "#172033" }}>
        {children}
      </body>
    </html>
  );
}