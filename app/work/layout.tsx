import { NavigationHeader } from "@/app/_components/navigation-header";
import { SiteFooter } from "@/app/_components/site-footer";

export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
