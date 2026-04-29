"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const API = "/api/pg";

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [projectType, setProjectType] = useState("flip");
  const [totalBudget, setTotalBudget] = useState("");
  const [resaleLow, setResaleLow] = useState("");
  const [resaleHigh, setResaleHigh] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`${API}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          address: address || null,
          city: city || null,
          state: state || null,
          zip: zip || null,
          project_type: projectType,
          total_budget: totalBudget ? parseFloat(totalBudget) : null,
          resale_target_low: resaleLow ? parseFloat(resaleLow) : null,
          resale_target_high: resaleHigh ? parseFloat(resaleHigh) : null,
          status: "active",
          phase: "demo",
          meta: {},
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create project");
      }

      const project = await res.json();
      router.push(`/portal/projects/${project.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  const inputClass =
    "w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:border-[color:var(--brand-teal)] focus:outline-none";

  return (
    <div className="space-y-6 max-w-lg">
      <Link
        href="/portal/projects"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Projects
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-neutral-900">New Project</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Set up your renovation project to start tracking costs.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Project Name *
              </label>
              <input
                className={inputClass}
                placeholder="e.g. 102 Wiltop Rd Flip"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Address
                </label>
                <input
                  className={inputClass}
                  placeholder="123 Main St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  City
                </label>
                <input
                  className={inputClass}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    State
                  </label>
                  <input
                    className={inputClass}
                    maxLength={2}
                    placeholder="NJ"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    ZIP
                  </label>
                  <input
                    className={inputClass}
                    maxLength={5}
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Project Type
              </label>
              <select
                className={inputClass}
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                <option value="flip">Flip</option>
                <option value="renovation">Renovation</option>
                <option value="new_construction">New Construction</option>
                <option value="addition">Addition</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Total Budget
              </label>
              <input
                className={inputClass}
                type="number"
                step="1000"
                placeholder="50000"
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Resale Target (Low)
                </label>
                <input
                  className={inputClass}
                  type="number"
                  step="1000"
                  placeholder="500000"
                  value={resaleLow}
                  onChange={(e) => setResaleLow(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Resale Target (High)
                </label>
                <input
                  className={inputClass}
                  type="number"
                  step="1000"
                  placeholder="600000"
                  value={resaleHigh}
                  onChange={(e) => setResaleHigh(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <Button type="submit" disabled={saving || !name.trim()} className="w-full">
              {saving ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
