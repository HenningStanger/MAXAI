import { getUserSession } from "@/lib/auth/user-session";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";

export default async function OnboardingPage() {
  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-6 py-12">
      <section className="w-full rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Onboarding</h1>
        <p className="mt-2 text-sm text-slate-600">
          La oss sette opp leadsmaskinen din. Dette tar under 2 minutter.
        </p>
        <OnboardingForm />
      </section>
    </main>
  );
}

