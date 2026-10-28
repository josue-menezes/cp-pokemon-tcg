import LoginForm from "@/components/LoginForm";
import Pokeball from "@/components/Pokeball";

export default function LoginPage() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 bg-brand px-8 py-6 text-white">
          <Pokeball className="h-10 w-10" />
          <div>
            <h1 className="text-2xl font-bold">Pokédex TCG</h1>
            <p className="text-sm text-red-100">Minhas cartas favoritas</p>
          </div>
        </div>
        <div className="p-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
