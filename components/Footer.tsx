import { TEAM } from "@/lib/team";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-600">
      <ul className="flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-6">
        {TEAM.map((member) => (
          <li key={member.rm + member.name}>
            {member.name} <span className="text-slate-400">— RM {member.rm}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-slate-400">Pokédex TCG · Checkpoint Front-End Design Engineering · FIAP</p>
    </footer>
  );
}
