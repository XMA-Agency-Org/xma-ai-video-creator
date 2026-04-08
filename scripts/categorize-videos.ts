import { readFileSync, writeFileSync } from "fs";

const MANIFEST_PATH = "./public/videos/manifest-final.json";

type ManifestEntry = { id: string; video: string };
type CategorizedEntry = ManifestEntry & { category: string; title: string };

// Based on visual review of thumbnail grid
const CATEGORIES: Record<string, { category: string; title: string }> = {
  // Row 1: pink dress model, purple outfit model, archway model, brown dress model, Burj scene, pink tube product, seashell product
  "15d0747cd01e": { category: "Fashion & Lifestyle", title: "Elegant Pink Dress" },
  "932e344e91a9": { category: "Fashion & Lifestyle", title: "Purple Outfit Editorial" },
  "db1a94876e5e": { category: "Fashion & Lifestyle", title: "Desert Archway Scene" },
  "fa8e67902c10": { category: "Fashion & Lifestyle", title: "Neutral Tones Editorial" },
  "66cb8849cb34": { category: "CGI & 3D", title: "Dubai Skyline Composite" },
  "2b2ff8b53696": { category: "Skincare", title: "Pink Tube Product Showcase" },
  "eee1c465fa4b": { category: "CGI & 3D", title: "Seashell Product Fantasy" },

  // Row 2: pink products, hair serum, blue outfit model, Burj tower CGI, magazine cover, pink pajamas, product lineup
  "36996f557d12": { category: "Skincare", title: "Colorful Skincare Line" },
  "c575974a8de5": { category: "Haircare", title: "Hair Serum & Styling" },
  "35f816e914fb": { category: "Fashion & Lifestyle", title: "Blue Elegance Editorial" },
  "46bea5d969c9": { category: "CGI & 3D", title: "Burj Khalifa Brand Takeover" },
  "da34ba74cd4c": { category: "CGI & 3D", title: "Glamour Magazine Cover" },
  "00d0f44aff13": { category: "UGC", title: "Cozy Pink Lifestyle" },
  "915ce17603a3": { category: "Skincare", title: "Skincare Product Reveal" },

  // Row 3: holographic product, curly hair, bull scene, mermaid pool, pink dress model, skincare creator, product hold
  "51b859cec4fd": { category: "Product Ads", title: "Holographic Tube Launch" },
  "06b1c92242ce": { category: "Haircare", title: "Curly Hair Transformation" },
  "e22994b385d8": { category: "CGI & 3D", title: "Cinematic Desert Scene" },
  "f22a6dd69424": { category: "CGI & 3D", title: "Mermaid Pool Fantasy" },
  "34086a763b7e": { category: "Fashion & Lifestyle", title: "Pink Summer Dress" },
  "7d349151423b": { category: "UGC", title: "Skincare Routine Creator" },
  "1b69da1ab10a": { category: "Skincare", title: "Product Close-Up Review" },

  // Row 4: purple shampoo, byte snacks, green product, pink glow, pool float, chocolate product
  "7dc15cdb03b5": { category: "Product Ads", title: "Purple Shampoo Launch" },
  "cb2d9ca05329": { category: "Product Ads", title: "Byte Snacks Commercial" },
  "460a4a3bfe2d": { category: "Product Ads", title: "Green Serum Showcase" },
  "ddd58304c75e": { category: "CGI & 3D", title: "Glowing Brand Animation" },
  "35a0f314c429": { category: "Fashion & Lifestyle", title: "Pool Day Lifestyle" },
  "efb606b77197": { category: "Product Ads", title: "Artisan Chocolate Ad" },

  // Row 5: hair product, mermaid teal, teal product toss, poolside, model closeup
  "df90be678ee2": { category: "Haircare", title: "Hair Treatment Product" },
  "82842627a62f": { category: "CGI & 3D", title: "Teal Mermaid Fantasy" },
  "ec0b9b55af0c": { category: "Product Ads", title: "Dynamic Product Toss" },
  "a383434d33d7": { category: "Fashion & Lifestyle", title: "Poolside Relaxation" },
  "76287ddc0815": { category: "UGC", title: "Summer Beauty Creator" },

  // Row 6: collagen glass, teal water, pool float 2, model portrait
  "2acde8771515": { category: "Product Ads", title: "Collagen Drink Ad" },
  "fb3aad7effbd": { category: "CGI & 3D", title: "Underwater Product Scene" },
  "f441fd81045b": { category: "UGC", title: "Lifestyle Beauty Review" },
};

function main() {
  const manifest: ManifestEntry[] = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));

  const categorized: CategorizedEntry[] = manifest.map((entry) => {
    const shortId = entry.id.substring(0, 12);
    const meta = CATEGORIES[shortId] || { category: "Uncategorized", title: "Video" };
    return { ...entry, category: meta.category, title: meta.title };
  });

  const categoryCount: Record<string, number> = {};
  categorized.forEach((e) => {
    categoryCount[e.category] = (categoryCount[e.category] || 0) + 1;
  });

  console.log("Category distribution:");
  Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`));

  writeFileSync("./public/videos/manifest-final.json", JSON.stringify(categorized, null, 2));
  console.log(`\nSaved ${categorized.length} categorized videos to manifest-final.json`);
}

main();
