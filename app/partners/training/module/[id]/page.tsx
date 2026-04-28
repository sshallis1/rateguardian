import Link from "next/link";
import { notFound } from "next/navigation";
import { getModuleById, getCategoryById } from "@/lib/partners/training";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const module = getModuleById(id);
  if (!module) notFound();

  const category = getCategoryById(module.category);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
          <Link
            href="/partners/training"
            className="hover:text-neutral-600 transition-colors"
          >
            Training
          </Link>
          <span>/</span>
          <Link
            href={`/partners/training/${module.category}`}
            className="hover:text-neutral-600 transition-colors"
          >
            {category?.label}
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">{module.title}</h1>
        <div className="flex items-center gap-3 mt-2">
          <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-[color:var(--brand-teal)]/10 text-[color:var(--brand-teal)]">
            {module.type}
          </span>
          <span className="text-sm text-neutral-400">{module.duration}</span>
        </div>
      </div>

      {/* Video/Content Player Area */}
      <div className="bg-neutral-900 rounded-xl aspect-video flex items-center justify-center">
        {module.videoUrl ? (
          <iframe
            src={module.videoUrl}
            className="w-full h-full rounded-xl"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="text-center text-neutral-400">
            <p className="text-lg font-medium">Content Coming Soon</p>
            <p className="text-sm mt-1">
              This module is being prepared for upload.
            </p>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="font-bold text-neutral-900 mb-2">About This Module</h2>
        <p className="text-neutral-600">{module.description}</p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link
          href={`/partners/training/${module.category}`}
          className="text-sm text-[color:var(--brand-teal)] hover:underline"
        >
          ← Back to {category?.label}
        </Link>
      </div>
    </div>
  );
}
