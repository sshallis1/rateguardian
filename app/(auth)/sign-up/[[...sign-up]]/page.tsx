import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--brand-cream)]">
      <SignUp />
    </div>
  );
}
