"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Check, AlertCircle, Image as ImageIcon } from "lucide-react";

type ImageUploaderProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
};

export function ImageUploader({
  value,
  onChange,
  label = "Image",
  aspectRatio = "wide",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Failed to upload image.");
        setUploading(false);
        return;
      }

      onChange(data.url);
    } catch {
      setError("Network error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  const aspectClass =
    aspectRatio === "portrait"
      ? "aspect-[3/4] max-h-56"
      : aspectRatio === "square"
      ? "aspect-square max-h-48"
      : aspectRatio === "video"
      ? "aspect-video max-h-44"
      : "aspect-[16/9] max-h-44";

  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-bold text-slate-600 uppercase">
        {label} <span className="text-blue-600">*</span>
      </label>

      {/* Preview Box */}
      {value ? (
        <div className={`relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm ${aspectClass}`}>
          <Image src={value} alt="Preview" fill className="object-contain" />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-emerald-800 font-semibold flex items-center gap-1 border border-emerald-200 shadow-sm">
            <Check className="size-3 text-emerald-600" />
            <span>Active Photo</span>
          </div>
        </div>
      ) : (
        <div className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 text-center ${aspectClass}`}>
          <ImageIcon className="size-8 text-slate-400 mb-2" />
          <p className="text-xs text-slate-500">No photo selected</p>
        </div>
      )}

      {/* Controls: Upload Button + Manual Path Input */}
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200 px-3.5 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer shadow-sm">
          <Upload className="size-3.5" />
          <span>{uploading ? "Uploading..." : "Upload from Computer"}</span>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleFile}
            className="hidden"
          />
        </label>

        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="or paste path: /media/your-photo.jpg"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600">
          <AlertCircle className="size-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
