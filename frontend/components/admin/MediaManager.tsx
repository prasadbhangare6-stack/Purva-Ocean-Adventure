"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check, Search, FileImage } from "lucide-react";

export function MediaManager({ files }: { files: string[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const filtered = files.filter((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0a2558]">Media Library</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Browse all uploaded ocean photographs, dive videos, and banners ({files.length} active assets). Click any item to copy its path.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter media files..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((filePath) => {
          const isVideo = filePath.endsWith(".mp4") || filePath.endsWith(".webm");
          return (
            <div
              key={filePath}
              className="group rounded-2xl border border-slate-200/80 bg-white overflow-hidden flex flex-col hover:shadow-md transition-all shadow-sm"
            >
              <div className="relative aspect-square w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                {isVideo ? (
                  <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                    <FileImage className="size-8 text-[#1865db] mb-1" />
                    <span className="text-[0.62rem] uppercase font-bold tracking-wider text-slate-600">Video File</span>
                  </div>
                ) : (
                  <Image
                    src={filePath}
                    alt={filePath}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              <div className="p-3 bg-slate-50 flex items-center justify-between gap-2 border-t border-slate-100">
                <span className="text-xs text-slate-700 truncate font-mono font-medium" title={filePath}>
                  {filePath.split("/").pop()}
                </span>
                <button
                  onClick={() => handleCopy(filePath)}
                  className="shrink-0 p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-[#0a2558] transition-colors cursor-pointer shadow-xs"
                  title="Copy path to clipboard"
                >
                  {copiedPath === filePath ? (
                    <Check className="size-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
