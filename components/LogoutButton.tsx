"use client";

import { useRouter } from "next/navigation";
import { clearFavorites } from "@/lib/favorites";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    clearFavorites(); // enunciado: ao deslogar, os favoritos devem ser limpos
    await fetch("/api/logout", { method: "POST" }); // apaga o cookie no servidor
    router.replace("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg border border-white/60 px-3 py-1.5 text-sm font-semibold hover:bg-white hover:text-brand"
    >
      Sair
    </button>
  );
}
