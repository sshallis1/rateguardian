import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryById,
  getModulesByCategory,
  type TrainingCategory,
} from "@/lib/partners/training";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryById(category);
  if (!cat) notFound();

  const modules = getModulesByCategory(category as TrainingCategory);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/partners/training"
          className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          ← Training Library
        </Link>
        <h1 className="text-2xl font-bold text-neutral-900 mt-2">
          {cat.label}
        </h1>
        <p className="text-neutral-500 mt-1">{cat.description}</p>
      </div>

      {modules.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
          <p className="text-neutral-500">
            Content for this category is being uploaded. Check back soon.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {modules.map((module, idx) => (
            <Link
              key={module.id}
              href={`/partners/training/module/${module.id}`}
              className="flex items-center gap-4 bg-white rounded-xl border border-neutral-200 p-5 hover:border-[color:var(--brand-teal)] hover:shadow-sm transition-all"
            >
              <span className="flex-none w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-bold text-neutral-500">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-neutral-900">{module.title}</h3>
                <p className="text-sm text-neutral-500 line-clamp-1">
                  {module.description}
                </p>
              </div>
              <div className="flex-none text-right">
                <span className="text-xs font-medium text-neutral-400 uppercase">
                  {module.type}
                </span>
                <p className="text-xs text-neutral-400">{module.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
