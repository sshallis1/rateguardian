"use client";

import * as React from "react";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import { STATES } from "@/lib/states";

interface StateSelectorProps {
  /** Base path for state links, e.g. "/physician-loans" */
  basePath: string;
  /** Optional heading override */
  heading?: string;
  /** Optional subheading */
  subheading?: string;
}

export function StateSelector({
  basePath,
  heading = "Available in All 50 States",
  subheading = "Select your state for local details.",
}: StateSelectorProps) {
  const [query, setQuery] = React.useState("");

  const filtered = query.trim()
    ? STATES.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.abbr.toLowerCase() === query.toLowerCase()
      )
    : STATES;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{heading}</h2>
        <p className="text-neutral-600 mb-6">{subheading}</p>
        <div className="relative max-w-sm mx-auto">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            placeholder="Search by state name or abbreviation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-neutral-200 bg-white text-sm focus:border-[color:var(--brand-teal)] focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-neutral-500 text-sm">
          No states match &ldquo;{query}&rdquo;
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-w-5xl mx-auto">
        {filtered.map((s) => (
          <Link
            key={s.slug}
            href={`${basePath}/${s.slug}`}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:border-[color:var(--brand-teal)] hover:text-[color:var(--brand-teal)] transition-colors"
          >
            <MapPin
              size={12}
              className="text-neutral-400 group-hover:text-[color:var(--brand-teal)] transition-colors flex-shrink-0"
            />
            {s.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
