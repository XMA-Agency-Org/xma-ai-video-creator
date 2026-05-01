import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Manrope, DM_Sans } from "next/font/google";
import { projectId } from "@/sanity/env";
import { SanityLive } from "@/sanity/lib/live";
import { PostHogProvider } from "@/app/_components/posthog-provider";
import { SmoothScrollProvider } from "@/app/_components/smooth-scroll-provider";
import { WhatsAppWidget } from "@/app/_components/whatsapp-widget";
import { QualificationPopupProvider } from "@/app/(landing)/_components/qualification-popup/qualification-popup-provider";

const QualificationPopup = dynamic(
  () => import("@/app/(landing)/_components/qualification-popup/qualification-popup").then((m) => m.QualificationPopup),
  { ssr: false }
);

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
  verification: {
    google: "Efg_S3qkxMIgFk4-XHuC56EG0sbjG6DFbpaoUBF4ak4",
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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K46Q3QG6');`,
          }}
        />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K46Q3QG6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <SmoothScrollProvider />
        <QualificationPopupProvider>
          <Suspense>
            <PostHogProvider>
              {children}
            </PostHogProvider>
          </Suspense>
          <WhatsAppWidget />
          <QualificationPopup />
        </QualificationPopupProvider>
        {projectId && <SanityLive />}
      </body>
    </html>
  );
}
