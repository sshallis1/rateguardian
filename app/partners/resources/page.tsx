import Link from "next/link";

const RESOURCES = [
  {
    title: "Rate Guardian — Partner Referral Link",
    description:
      "Share this link with your clients. They get free mortgage monitoring. You get a client for life.",
    href: "/rate-guardian",
    type: "link",
  },
  {
    title: "10X House Selling Secrets",
    description:
      "Sean's Amazon #1 Best Seller. Share with listing clients to position yourself as the expert.",
    href: "#",
    type: "book",
  },
  {
    title: "Co-Branded Marketing Templates",
    description:
      "Flyers, social posts, and email templates with your name + Sean's mortgage expertise.",
    href: "#",
    type: "download",
  },
  {
    title: "Loan Doctor Podcast — Guest Appearance Kit",
    description:
      "Want to be on the podcast? Here's how to prepare and what to expect.",
    href: "#",
    type: "guide",
  },
  {
    title: "Market Update Talking Points",
    description:
      "Weekly bullet points you can share with clients about rates, market conditions, and opportunities.",
    href: "#",
    type: "weekly",
  },
  {
    title: "Sean's Direct Line",
    description:
      "For deal-specific questions, pre-approvals, or rush scenarios. Partners get priority.",
    href: "tel:9734616955",
    type: "contact",
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Partner Resources
        </h1>
        <p className="text-neutral-500 mt-1">
          Tools, templates, and direct access to help you close more deals.
        </p>
      </div>

      <div className="space-y-3">
        {RESOURCES.map((resource) => (
          <Link
            key={resource.title}
            href={resource.href}
            className="flex items-start gap-4 bg-white rounded-xl border border-neutral-200 p-5 hover:border-[color:var(--brand-teal)] hover:shadow-sm transition-all"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-neutral-900">
                  {resource.title}
                </h3>
                <span className="text-xs font-medium text-neutral-400 uppercase">
                  {resource.type}
                </span>
              </div>
              <p className="text-sm text-neutral-500">
                {resource.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
