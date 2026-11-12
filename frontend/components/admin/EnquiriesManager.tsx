"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  Search,
  ExternalLink,
  Trash2,
  Inbox,
  Sheet,
  X,
  User,
  Calendar,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

export type EnquiryRecord = {
  id: string;
  submittedAt: string;
  formattedTimestamp: string;
  fullName: string;
  email: string;
  phone: string;
  experienceLevel: string;
  message?: string;
  status?: "new" | "contacted" | "booked" | "archived";
};

export function EnquiriesManager({
  initialEnquiries,
  googleSheetUrl,
}: {
  initialEnquiries: EnquiryRecord[];
  googleSheetUrl: string;
}) {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(initialEnquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = enquiries.filter(
    (e) =>
      e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.includes(searchTerm) ||
      e.experienceLevel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry record?")) return;
    setDeletingId(id);
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    if (!confirm("Are you sure you want to remove all enquiry records?")) return;
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      if (res.ok) {
        setEnquiries([]);
        setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error("Failed to clear enquiries:", err);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Header Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              Live Expedition Bookings &amp; Inquiries
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-serif text-[#0a2558] font-bold">
            Contact Enquiries
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Review incoming dive tour bookings and certification inquiries ({enquiries.length} total).
          </p>
        </div>

        <div className="flex items-center gap-3">
          {enquiries.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors shadow-sm cursor-pointer"
            >
              <Trash2 className="size-3.5" />
              <span>Clear All</span>
            </button>
          )}

          <a
            href={googleSheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm cursor-pointer"
          >
            <Sheet className="size-4 text-emerald-600" />
            <span>Open Live Google Sheet</span>
            <ExternalLink className="size-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Search Bar */}
      {enquiries.length > 0 && (
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, phone, or course..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-blue-600 focus:outline-none"
          />
        </div>
      )}

      {/* Enquiries Table Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
        {enquiries.length === 0 ? (
          <div className="p-12 sm:p-16 text-center space-y-4">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-[#1865db]">
              <Inbox className="size-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0a2558]">No Customer Enquiries Yet</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                When travelers submit inquiry forms or course registrations on the website, they will appear here and synchronize automatically to your connected Google Sheet.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0a2346] text-white text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Received (IST)</th>
                  <th className="px-5 py-3.5">Lead Name</th>
                  <th className="px-5 py-3.5">Contact Details</th>
                  <th className="px-5 py-3.5">Trip / Experience</th>
                  <th className="px-5 py-3.5">Message</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-xs">
                      No inquiries matching &quot;{searchTerm}&quot;.
                    </td>
                  </tr>
                ) : (
                  filtered.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">
                        {enq.formattedTimestamp || new Date(enq.submittedAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-5 py-4 font-bold text-[#0a2558] whitespace-nowrap">
                        {enq.fullName}
                      </td>
                      <td className="px-5 py-4 text-xs whitespace-nowrap space-y-1">
                        <div className="flex items-center gap-1.5 text-[#1865db]">
                          <Mail className="size-3 shrink-0" />
                          <a href={`mailto:${enq.email}`} className="hover:underline">
                            {enq.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-700 font-mono">
                          <Phone className="size-3 shrink-0 text-slate-400" />
                          <a
                            href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-700 hover:underline"
                          >
                            {enq.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs whitespace-nowrap">
                        <span className="rounded-full bg-blue-50 border border-blue-200/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                          {enq.experienceLevel}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-600 max-w-xs truncate">
                        {enq.message || <span className="text-slate-400 italic">No notes</span>}
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(enq)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#0a2558] hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(enq.id)}
                            disabled={deletingId === enq.id}
                            title="Delete Lead"
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl relative text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-blue-600" />
                <h3 className="text-base font-bold text-[#0a2558]">Customer Enquiry Details</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block font-bold text-slate-400 uppercase text-[10px]">Lead Name</span>
                  <p className="mt-0.5 text-sm font-bold text-[#0a2558]">{selectedEnquiry.fullName}</p>
                </div>
                <div>
                  <span className="block font-bold text-slate-400 uppercase text-[10px]">Received</span>
                  <p className="mt-0.5 text-slate-700">{selectedEnquiry.formattedTimestamp || selectedEnquiry.submittedAt}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block font-bold text-slate-400 uppercase text-[10px]">Email Address</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="mt-0.5 text-[#1865db] hover:underline font-medium block">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <span className="block font-bold text-slate-400 uppercase text-[10px]">WhatsApp / Phone</span>
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 text-[#0a2558] font-mono font-bold hover:underline block"
                  >
                    {selectedEnquiry.phone}
                  </a>
                </div>
              </div>

              <div>
                <span className="block font-bold text-slate-400 uppercase text-[10px]">Course / Dive Experience</span>
                <span className="mt-1 inline-block rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-700">
                  {selectedEnquiry.experienceLevel}
                </span>
              </div>

              <div>
                <span className="block font-bold text-slate-400 uppercase text-[10px]">Message &amp; Notes</span>
                <div className="mt-1 rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 text-slate-700 leading-relaxed min-h-[70px]">
                  {selectedEnquiry.message || <span className="italic text-slate-400">No notes provided with this enquiry.</span>}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleDelete(selectedEnquiry.id)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800"
              >
                <Trash2 className="size-3.5" />
                <span>Delete Lead</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-xl bg-[#0a2346] px-4 py-2 text-xs font-bold text-white hover:bg-[#123363]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
