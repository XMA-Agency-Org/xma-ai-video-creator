import { notFound } from "next/navigation";
import { CategorizeTool } from "./_components/categorize-tool";

export const metadata = {
  title: "Categorize Videos | Admin",
};

export default function CategorizePage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <CategorizeTool />;
}
