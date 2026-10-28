import { cookies } from "next/headers";
import Header from "@/components/Header";
import { getUserFromToken, SESSION_COOKIE } from "@/lib/session";

// Layout da área logada: todas as páginas aqui dentro ganham o Header com logout
export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const user = getUserFromToken(cookieStore.get(SESSION_COOKIE)?.value);

  return (
    <>
      <Header user={user} />
      <main className="mx-auto w-full max-w-6xl p-4 sm:p-6">{children}</main>
    </>
  );
}
