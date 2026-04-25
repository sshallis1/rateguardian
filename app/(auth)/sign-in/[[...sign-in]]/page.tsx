import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--brand-cream)]">
      <SignIn />
    </div>
  );
}
