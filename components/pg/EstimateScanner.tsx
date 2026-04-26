"use client";

import { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Camera,
  MessageCircle,
  ArrowRight,
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  "Cabinets & Countertops",
  "Carpet & Resilient",
  "Hardwood Flooring",
  "Tiling",
  "Painting",
  "Plumbing",
  "HVAC",
  "Electrical",
  "Demolition",
  "Landscaping",
  "Appliances",
  "Doors & Trim",
  "Framing & Drywall",
  "Miscellaneous",
];

export function EstimateScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category || !amount) return;
    setUploading(true);
    // Simulate upload — real implementation would POST to /api/pg/estimates
    await new Promise((r) => setTimeout(r, 1500));
    setUploading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <FileText size={28} className="text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Estimate Uploaded</h2>
        <p className="text-neutral-600 mb-6">
          Rosie is reviewing your {category} estimate for {vendorName || "your vendor"}.
          {amount && ` Quoted amount: $${Number(amount).toLocaleString()}.`}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/project-guardian/chat"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition-colors"
          >
            <MessageCircle size={16} />
            Ask Rosie About This
          </Link>
          <Link
            href="/project-guardian/compare"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold text-sm hover:border-neutral-900 transition-colors"
          >
            View Local Comparison
            <ArrowRight size={16} />
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setFile(null);
              setCategory("");
              setAmount("");
              setVendorName("");
              setNotes("");
            }}
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold text-sm hover:border-neutral-900 transition-colors"
          >
            Upload Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* File Upload Area */}
      <div
        className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
          file
            ? "border-orange-300 bg-orange-50"
            : "border-neutral-300 bg-white hover:border-orange-300"
        }`}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.heic,.webp"
          onChange={handleFile}
        />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <FileText size={24} className="text-orange-600" />
            <span className="font-medium text-neutral-900">{file.name}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="p-1 rounded-full hover:bg-neutral-200"
            >
              <X size={16} className="text-neutral-400" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-4 mb-3">
              <Upload size={32} className="text-neutral-400" />
              <Camera size={32} className="text-neutral-400" />
            </div>
            <p className="font-semibold text-neutral-900 mb-1">
              Upload contractor estimate
            </p>
            <p className="text-sm text-neutral-500">
              PDF, photo, invoice, receipt, or scope of work.
              Drag and drop or click to browse.
            </p>
          </>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">
          What kind of work is this for?
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-4 py-3 border border-neutral-300 rounded-xl text-sm focus:border-orange-500 focus:outline-none bg-white"
        >
          <option value="">Select a category...</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Amount + Vendor */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            What were you quoted?
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-neutral-400">$</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3 border border-neutral-300 rounded-xl text-sm focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Vendor / Contractor name
          </label>
          <input
            type="text"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            placeholder="e.g. Empire Today"
            className="w-full px-4 py-3 border border-neutral-300 rounded-xl text-sm focus:border-orange-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-2">
          Anything else Rosie should know?
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="e.g. This is for the kitchen only. They said it includes materials and labor."
          className="w-full px-4 py-3 border border-neutral-300 rounded-xl text-sm focus:border-orange-500 focus:outline-none resize-none"
        />
      </div>

      {/* Quick Questions */}
      <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
          Questions to ask after uploading
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Is this estimate high?",
            "What should this cost locally?",
            "Should I get another bid?",
            "Can your team help me reduce this?",
            "What questions should I ask this contractor?",
          ].map((q) => (
            <span
              key={q}
              className="text-xs bg-white border border-neutral-200 rounded-full px-3 py-1.5 text-neutral-600"
            >
              {q}
            </span>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={uploading || !category || !amount}
        className="w-full h-14 rounded-full bg-orange-600 text-white font-semibold text-lg hover:bg-orange-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {uploading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload size={20} />
            Scan My Estimate
          </>
        )}
      </button>
    </form>
  );
}
