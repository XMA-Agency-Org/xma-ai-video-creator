import { Suspense } from "react";
import { NavigationHeader } from "@/app/_components/navigation-header";
import { SiteFooter } from "@/app/_components/site-footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationHeader />
      <main className="flex-1">{children}</main>
      <Suspense>
        <SiteFooter />
      </Suspense>
    </>
  );
}
