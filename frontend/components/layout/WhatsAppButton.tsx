"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/layout/BrandIcons";
import { OFFICIAL_WHATSAPP_NUMBER } from "@/lib/integrations/whatsapp";

/**
 * Floating Contact Button:
 * Unobtrusive, luxury floating contact access available across all website pages.
 * Features an elegant ocean-navy & champagne-gold badge with a soft live-status beacon.
 */
export function WhatsAppButton({
  whatsappUrl,
}: {
  whatsappUrl?: string | null;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultUrl = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Purva Ocean Adventures! I'm browsing the website and would like to learn more about your expeditions and dive courses."
  )}`;

  const finalUrl = whatsappUrl && whatsappUrl !== "https://wa.me/" ? whatsappUrl : defaultUrl;

  return (
    <aside
      aria-label="Expedition Support Contact"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5"
    >
      {/* Sleek Tooltip Pill on Hover */}
      <div
        className={`hidden sm:inline-flex items-center gap-2 rounded-full bg-[#02182e]/90 border border-sky-400/30 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-none select-none ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Chat with Expedition Lead</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={finalUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Purva Ocean Adventures on WhatsApp (opens in a new window)"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative inline-flex size-12 items-center justify-center rounded-full bg-[#011d38] border-2 border-[#E8C58F] text-[#E8C58F] shadow-[0_10px_30px_rgba(1,15,32,0.6)] transition-all duration-300 hover:scale-110 hover:bg-[#E8C58F] hover:text-[#010F20] hover:shadow-[0_0_25px_rgba(232,197,143,0.5)] active:scale-95 cursor-pointer"
      >
        {/* Soft live online pulse beacon */}
        <span className="absolute -top-1 -right-1 size-3 rounded-full bg-emerald-400 border-2 border-[#011d38] animate-pulse" />
        <WhatsAppIcon className="size-6 fill-current transition-transform duration-300 group-hover:rotate-12" />
      </a>
    </aside>
  );
}
