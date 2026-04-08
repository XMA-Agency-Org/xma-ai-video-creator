import { readFileSync, writeFileSync } from "fs";

const MANIFEST_PATH = "./public/videos/manifest-final.json";

type Entry = { id: string; video: string; category: string; title: string };

const FIXES: Record<string, { category: string; title: string }> = {
  "15d0747cd01e": { category: "Fashion & Lifestyle", title: "Cozy Pink Interior" },
  "932e344e91a9": { category: "UGC", title: "Store Product Showcase" },
  "db1a94876e5e": { category: "Fashion & Lifestyle", title: "Desert Archway Editorial" },
  "fa8e67902c10": { category: "Fashion & Lifestyle", title: "Neutral Tones Editorial" },
  "66cb8849cb34": { category: "Fashion & Lifestyle", title: "Dubai Skyline Scene" },
  "2b2ff8b53696": { category: "Skincare", title: "Neon Pink Tube Product" },
  "eee1c465fa4b": { category: "CGI & 3D", title: "Seashell Product Fantasy" },
  "36996f557d12": { category: "Haircare", title: "Hair Serum & Wrap" },
  "c575974a8de5": { category: "Haircare", title: "Hair Oil Treatment" },
  "35f816e914fb": { category: "Product Ads", title: "Dove & Cream Product" },
  "46bea5d969c9": { category: "UGC", title: "Glow Store Promo" },
  "da34ba74cd4c": { category: "UGC", title: "POV Hair Before & After" },
  "00d0f44aff13": { category: "Skincare", title: "Outdoor Shampoo Scene" },
  "915ce17603a3": { category: "Product Ads", title: "Beach Product Shot" },
  "51b859cec4fd": { category: "CGI & 3D", title: "Burj Tower Brand Takeover" },
  "06b1c92242ce": { category: "CGI & 3D", title: "Glamour Magazine Cover" },
  "e22994b385d8": { category: "Fashion & Lifestyle", title: "Pink Pajamas Scene" },
  "f22a6dd69424": { category: "UGC", title: "Skincare Review Cards" },
  "34086a763b7e": { category: "Fashion & Lifestyle", title: "Pink Summer Dress" },
  "7d349151423b": { category: "UGC", title: "Skincare Routine Creator" },
  "1b69da1ab10a": { category: "CGI & 3D", title: "Desert Bull Scene" },
  "7dc15cdb03b5": { category: "CGI & 3D", title: "Mermaid Product Hold" },
  "cb2d9ca05329": { category: "Fashion & Lifestyle", title: "Pink Hijab Shopping" },
  "460a4a3bfe2d": { category: "Fashion & Lifestyle", title: "Blue Ruffled Outfit" },
  "ddd58304c75e": { category: "Product Ads", title: "Purple Shampoo Bottles" },
  "35a0f314c429": { category: "Product Ads", title: "Byte Snacks Package" },
  "efb606b77197": { category: "CGI & 3D", title: "KAYALI Perfume Mermaid" },
  "df90be678ee2": { category: "Skincare", title: "Dewy Glow Product" },
  "82842627a62f": { category: "Fashion & Lifestyle", title: "Pool Water Scene" },
  "ec0b9b55af0c": { category: "Product Ads", title: "Ice Cream City Shot" },
  "a383434d33d7": { category: "CGI & 3D", title: "Collagen Wine Glass" },
  "76287ddc0815": { category: "Fashion & Lifestyle", title: "Pool Float Aerial" },
  "2acde8771515": { category: "Haircare", title: "Hair Tie Product Shot" },
  "fb3aad7effbd": { category: "Fashion & Lifestyle", title: "Flamingo Pool Party" },
  "f441fd81045b": { category: "UGC", title: "Product Review Creator" },
};

function main() {
  const manifest: Entry[] = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));

  const updated = manifest.map((entry) => {
    const shortId = entry.id.substring(0, 12);
    const fix = FIXES[shortId];
    if (fix) {
      return { ...entry, category: fix.category, title: fix.title };
    }
    return entry;
  });

  const categoryCount: Record<string, number> = {};
  updated.forEach((e) => {
    categoryCount[e.category] = (categoryCount[e.category] || 0) + 1;
  });

  console.log("Updated category distribution:");
  Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`));

  writeFileSync(MANIFEST_PATH, JSON.stringify(updated, null, 2));
  console.log(`\nSaved ${updated.length} updated entries`);
}

main();
