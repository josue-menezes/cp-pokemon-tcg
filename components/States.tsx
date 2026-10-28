// Estados de tela: carregando, vazio e erro

export function GridSkeleton() {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" aria-busy="true">
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i} className="animate-pulse rounded-2xl border border-slate-200 bg-white">
          <div className="aspect-[245/342] bg-slate-100" />
          <div className="space-y-2 p-4">
            <div className="h-3 w-1/3 rounded bg-slate-100" />
            <div className="h-4 w-3/4 rounded bg-slate-100" />
            <div className="h-5 w-1/4 rounded bg-slate-100" />
          </div>
        </li>
      ))}
      <span className="sr-only">Carregando cartas...</span>
    </ul>
  );
}

export function EmptyState({ message, children }: { message: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
      <p className="text-4xl">🔍</p>
      <p className="mt-2 text-slate-600">{message}</p>
      {children}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 py-16 text-center">
      <p className="text-4xl">⚠️</p>
      <p className="mt-2 text-red-700">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
