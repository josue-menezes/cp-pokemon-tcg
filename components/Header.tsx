import Link from "next/link";
import LogoutButton from "./LogoutButton";
import NavLinks from "./NavLinks";
import Pokeball from "./Pokeball";

export default function Header({ user }: { user: string | null }) {
  return (
    <header className="sticky top-0 z-10 bg-brand text-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/cards" className="flex items-center gap-2 text-lg font-bold">
          <Pokeball className="h-7 w-7" />
          <span className="hidden sm:inline">Pokédex TCG</span>
        </Link>
        <NavLinks />
        <div className="flex items-center gap-3">
          {user && <span className="hidden text-sm text-red-100 md:inline">Olá, {user}</span>}
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
