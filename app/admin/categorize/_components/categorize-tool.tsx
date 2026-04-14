"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

type VideoEntry = {
  id: string;
  video: string;
  category: string;
  title: string;
};

const CATEGORIES = [
  "Beauty",
  "Fragrance",
  "Fashion & Lifestyle",
  "Food & Beverage",
  "Real Estate",
  "E-Commerce",
  "CGI & 3D",
  "UGC",
  "Product Ads",
  "Service Business",
];

const CATEGORY_KEYS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((cat, i) => [String(i + 1), cat])
);

export function CategorizeTool() {
  const [entries, setEntries] = useState<VideoEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");
  const [filter, setFilter] = useState<"all" | "uncategorized">("all");
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios.get<VideoEntry[]>("/api/categorize").then((res) => {
      setEntries(res.data);
    });
  }, []);

  const filtered = filter === "uncategorized"
    ? entries.filter((e) => !e.category || e.category === "Uncategorized")
    : entries;

  const current = filtered[currentIndex];

  useEffect(() => {
    if (videoRef.current && current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
    setConfirmingDelete(false);
  }, [current?.id]);

  const saveCategory = useCallback(async (category: string) => {
    if (!current || saving) return;
    setSaving(true);

    await axios.patch("/api/categorize", {
      id: current.id,
      category,
    });

    setEntries((prev) =>
      prev.map((e) => (e.id === current.id ? { ...e, category } : e))
    );
    setSaving(false);

    if (currentIndex < filtered.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [current, saving, currentIndex, filtered.length]);

  const deleteVideo = useCallback(async () => {
    if (!current || saving) return;
    setSaving(true);

    await axios.delete("/api/categorize", { data: { id: current.id } });

    setEntries((prev) => prev.filter((e) => e.id !== current.id));
    setConfirmingDelete(false);
    setSaving(false);

    if (currentIndex >= filtered.length - 2) {
      setCurrentIndex((i) => Math.max(i - 1, 0));
    }
  }, [current, saving, currentIndex, filtered.length]);

  const saveTitle = useCallback(async () => {
    if (!current || !titleDraft.trim()) return;
    setSaving(true);

    await axios.patch("/api/categorize", {
      id: current.id,
      title: titleDraft.trim(),
    });

    setEntries((prev) =>
      prev.map((e) => (e.id === current.id ? { ...e, title: titleDraft.trim() } : e))
    );
    setEditingTitle(false);
    setSaving(false);
  }, [current, titleDraft]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (editingTitle) return;

      const cat = CATEGORY_KEYS[e.key];
      if (cat) {
        e.preventDefault();
        saveCategory(cat);
        return;
      }

      if (e.key === "ArrowRight" || e.key === "d") {
        e.preventDefault();
        setCurrentIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowLeft" || e.key === "a") {
        e.preventDefault();
        setCurrentIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "t") {
        e.preventDefault();
        setTitleDraft(current?.title ?? "");
        setEditingTitle(true);
        setTimeout(() => titleInputRef.current?.focus(), 50);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editingTitle, current, saveCategory, filtered.length]);

  if (!entries.length) {
    return <div className="flex h-screen items-center justify-center text-lg">Loading videos...</div>;
  }

  if (!current) {
    return (
      <div className="flex h-screen items-center justify-center text-lg">
        All done! No more videos to categorize.
      </div>
    );
  }

  const categoryStats = entries.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex h-screen bg-neutral-950 text-white">
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="relative w-full max-w-[400px]">
          <video
            ref={videoRef}
            className="w-full rounded-2xl shadow-2xl aspect-[9/16] object-cover"
            src={current.video}
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold backdrop-blur-sm">
            {currentIndex + 1} / {filtered.length}
          </div>

          <div className="absolute top-3 right-3 rounded-full bg-primary-500/80 px-3 py-1 text-xs font-bold backdrop-blur-sm">
            {current.category || "Uncategorized"}
          </div>

          <div className="mt-4">
            {editingTitle ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveTitle();
                }}
                className="flex gap-2"
              >
                <input
                  ref={titleInputRef}
                  value={titleDraft}
                  onChange={(e) => setTitleDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setEditingTitle(false);
                  }}
                  className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none ring-1 ring-white/20 focus:ring-primary-500"
                  placeholder="Enter title..."
                  autoFocus
                />
                <button
                  type="submit"
                  className="rounded-xl bg-primary-500 px-4 py-3 text-sm font-bold hover:bg-primary-600"
                >
                  Save
                </button>
              </form>
            ) : (
              <button
                onClick={() => {
                  setTitleDraft(current.title);
                  setEditingTitle(true);
                }}
                className="group flex w-full items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-left transition-colors hover:bg-white/10"
              >
                <span className="flex-1 text-sm font-bold">{current.title}</span>
                <span className="text-xs text-neutral-500 group-hover:text-neutral-300">
                  click or press T to rename
                </span>
              </button>
            )}
          </div>

          <div className="mt-3">
            {confirmingDelete ? (
              <div className="flex gap-2">
                <button
                  onClick={deleteVideo}
                  disabled={saving}
                  className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-bold transition-colors hover:bg-red-700 disabled:opacity-50"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => setConfirmingDelete(false)}
                  className="flex-1 rounded-xl bg-white/10 py-3 text-sm font-bold transition-colors hover:bg-white/20"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmingDelete(true)}
                className="w-full rounded-xl bg-red-500/10 py-3 text-sm font-bold text-red-400 transition-colors hover:bg-red-500/20"
              >
                Delete Video
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-80 flex-col border-l border-white/10 bg-neutral-900">
        <div className="border-b border-white/10 p-4">
          <h2 className="text-lg font-bold">Categorize Videos</h2>
          <p className="mt-1 text-xs text-neutral-400">
            Press number keys to assign category. Arrow keys or A/D to navigate. T to edit title.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => { setFilter("all"); setCurrentIndex(0); }}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                filter === "all" ? "bg-white text-black" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              All ({entries.length})
            </button>
            <button
              onClick={() => { setFilter("uncategorized"); setCurrentIndex(0); }}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                filter === "uncategorized" ? "bg-white text-black" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Uncategorized ({entries.filter((e) => !e.category || e.category === "Uncategorized").length})
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-500">
            Pick a category
          </p>
          <div className="space-y-2">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                onClick={() => saveCategory(cat)}
                disabled={saving}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                  current.category === cat
                    ? "bg-primary-500 text-white"
                    : "bg-white/5 text-neutral-300 hover:bg-white/10"
                }`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10 text-xs font-bold">
                  {i + 1}
                </span>
                {cat}
                <span className="ml-auto text-xs text-neutral-500">
                  {categoryStats[cat] || 0}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
              Stats
            </p>
            {Object.entries(categoryStats)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, count]) => (
                <div key={cat} className="flex items-center justify-between py-1 text-xs">
                  <span className="text-neutral-400">{cat}</span>
                  <span className="font-bold">{count}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
              disabled={currentIndex === 0}
              className="flex-1 rounded-xl bg-white/5 py-3 text-sm font-bold transition-colors hover:bg-white/10 disabled:opacity-30"
            >
              &larr; Prev
            </button>
            <button
              onClick={() => setCurrentIndex((i) => Math.min(i + 1, filtered.length - 1))}
              disabled={currentIndex >= filtered.length - 1}
              className="flex-1 rounded-xl bg-white/5 py-3 text-sm font-bold transition-colors hover:bg-white/10 disabled:opacity-30"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
