import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import {
  getFeaturedModules,
  TRAINING_CATEGORIES,
} from "@/lib/partners/training";

export default async function PartnerDashboardPage() {
  const user = await getCurrentUser();
  const featured = getFeaturedModules();

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Welcome back, {user?.firstName ?? "Partner"}
        </h1>
        <p className="text-neutral-500 mt-1">
          Your exclusive training library and partner resources.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Training Hours", value: "200+" },
          { label: "Categories", value: String(TRAINING_CATEGORIES.length) },
          { label: "Frameworks", value: "5" },
          { label: "New This Month", value: "3" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-neutral-200 p-4"
          >
            <p className="text-2xl font-bold text-[color:var(--brand-teal)]">
              {stat.value}
            </p>
            <p className="text-sm text-neutral-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Featured Content */}
      <div>
        <h2 className="text-lg font-bold text-neutral-900 mb-4">
          Featured Training
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {featured.map((module) => (
            <Link
              key={module.id}
              href={`/partners/training/module/${module.id}`}
              className="bg-white rounded-xl border border-neutral-200 p-5 hover:border-[color:var(--brand-teal)] hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-[color:var(--brand-teal)]/10 text-[color:var(--brand-teal)]">
                  {module.category.replace("-", " ")}
                </span>
                <span className="text-xs text-neutral-400">
                  {module.duration}
                </span>
              </div>
              <h3 className="font-bold text-neutral-900 mb-1">
                {module.title}
              </h3>
              <p className="text-sm text-neutral-500 line-clamp-2">
                {module.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-lg font-bold text-neutral-900 mb-4">
          Training Categories
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {TRAINING_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/partners/training/${cat.id}`}
              className="bg-white rounded-xl border border-neutral-200 p-4 hover:border-[color:var(--brand-teal)] hover:shadow-sm transition-all"
            >
              <h3 className="font-bold text-neutral-900 text-sm mb-1">
                {cat.label}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
