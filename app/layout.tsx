import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import { projectId } from "@/sanity/env";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Video Creator | XMA Agency",
  description:
    "AI-powered video creation for modern brands. Get stunning, conversion-ready videos crafted with cutting-edge AI technology. By XMA Agency, Dubai.",
  openGraph: {
    title: "AI Video Creator | XMA Agency",
    description:
      "AI-powered video creation for modern brands. Get stunning, conversion-ready videos crafted with cutting-edge AI technology.",
    type: "website",
    locale: "en_US",
    siteName: "XMA AI Video Creator",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {projectId && <SanityLive />}
      </body>
    </html>
  );
}
