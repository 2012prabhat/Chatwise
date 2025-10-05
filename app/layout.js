import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ChatWise – Simplifying Support with Intelligence",
  description:
    "ChatWise is an intelligent knowledge base and chatbot solution that helps businesses simplify support, improve customer experience, and deliver instant answers effortlessly.",
  keywords: [
    "ChatWise",
    "AI chatbot",
    "knowledge base",
    "customer support",
    "automated support",
    "FAQ chatbot",
    "intelligent support system",
  ],
  authors: [{ name: "ChatWise Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "ChatWise – Simplifying Support with Intelligence",
    description:
      "Empower your support with ChatWise. An AI-driven knowledge base and chatbot that delivers instant, intelligent answers.",
    url: "https://yourdomain.com",
    siteName: "ChatWise",
    images: [
      {
        url: "/logo.png", // 👉 add an OG image later
        width: 1200,
        height: 630,
        alt: "ChatWise – Simplifying Support with Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
