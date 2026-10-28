export default function Pokeball({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`relative inline-block shrink-0 overflow-hidden rounded-full border-2 border-slate-900 bg-white ${className}`}
    >
      <span className="absolute inset-x-0 top-0 h-1/2 bg-red-500" />
      <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-slate-900" />
      <span className="absolute left-1/2 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-900 bg-white" />
    </span>
  );
}
