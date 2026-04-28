import Link from "next/link";

export const metadata = {
  title: "Access Denied — Partner Portal",
};

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--brand-cream)] px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Partner Access Required
        </h1>
        <p className="text-neutral-600 mb-6">
          This section is exclusively for licensed real estate professionals
          actively partnering with Sean Shallis. If you believe you should have
          access, reach out to Sean directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/partners"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[color:var(--brand-teal)] text-white font-semibold hover:bg-[color:var(--brand-teal-dark)] transition-colors"
          >
            Learn About the Program
          </Link>
          <Link
            href="/connect"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-100 transition-colors"
          >
            Contact Sean
          </Link>
        </div>
      </div>
    </div>
  );
}
