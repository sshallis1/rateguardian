import Link from "next/link";
import {
  TRAINING_CATEGORIES,
  getModulesByCategory,
} from "@/lib/partners/training";

export default function TrainingLibraryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Training Library
        </h1>
        <p className="text-neutral-500 mt-1">
          200+ hours of coaching, frameworks, and systems from Sean&apos;s
          RealtyCoach vault.
        </p>
      </div>

      <div className="space-y-6">
        {TRAINING_CATEGORIES.map((cat) => {
          const modules = getModulesByCategory(cat.id);
          return (
            <div key={cat.id}>
              <Link
                href={`/partners/training/${cat.id}`}
                className="group flex items-center justify-between mb-3"
              >
                <div>
                  <h2 className="text-lg font-bold text-neutral-900 group-hover:text-[color:var(--brand-teal)] transition-colors">
                    {cat.label}
                  </h2>
                  <p className="text-sm text-neutral-500">{cat.description}</p>
                </div>
                <span className="text-sm text-neutral-400 group-hover:text-[color:var(--brand-teal)] transition-colors">
                  {modules.length} modules →
                </span>
              </Link>
              {modules.length > 0 && (
                <div className="grid md:grid-cols-2 gap-3">
                  {modules.slice(0, 2).map((module) => (
                    <Link
                      key={module.id}
                      href={`/partners/training/module/${module.id}`}
                      className="bg-white rounded-lg border border-neutral-200 p-4 hover:border-[color:var(--brand-teal)] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-neutral-400 uppercase">
                          {module.type}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {module.duration}
                        </span>
                      </div>
                      <h3 className="font-semibold text-neutral-900 text-sm">
                        {module.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              )}
              {modules.length === 0 && (
                <p className="text-sm text-neutral-400 italic">
                  Content coming soon
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
