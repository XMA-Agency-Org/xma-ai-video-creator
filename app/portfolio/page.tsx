export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { WORK_PAGE_QUERY } from "@/sanity/lib/queries";
import { readFileSync } from "fs";
import { join } from "path";
import { WorkPageContent } from "./_components/work-page-content";
import type { VideoEntry } from "./_types/portfolio-types";

export const metadata: Metadata = {
  title: "Our Work | XMA AI Video Creator",
  description: "Browse our full portfolio of AI-generated video content for brands.",
};

type CloudinaryVideoEntry = {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  featured: boolean;
};

function getCloudinaryVideos(): VideoEntry[] {
  const raw = readFileSync(join(process.cwd(), "public/videos/cloudinary-videos.json"), "utf-8");
  return (JSON.parse(raw) as CloudinaryVideoEntry[]).map((e) => ({
    id: e.id,
    videoUrl: e.videoUrl,
    category: e.category,
    title: e.title,
  }));
}

export default async function WorkPage() {
  const { data: pageData } = await sanityFetch({ query: WORK_PAGE_QUERY });

  const header = pageData?.header ?? {
    subtitle: "PORTFOLIO",
    heading: "All Our Work",
    description: "Browse our complete collection of AI-generated video content. Hover to preview, click for fullscreen.",
  };
  const backText = pageData?.backLinkText ?? "Back to Home";
  const videos = getCloudinaryVideos();

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <div className="mb-12">
          <a
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            &larr; {backText}
          </a>
          <p className="text-sm font-bold uppercase tracking-widest text-primary-500">
            {header.subtitle}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl md:text-6xl">
            {header.heading}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            {header.description}
          </p>
        </div>

        <WorkPageContent videos={videos} />
      </div>
    </section>
  );
}
