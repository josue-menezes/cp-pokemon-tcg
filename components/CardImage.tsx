"use client";

import Image from "next/image";
import { useState } from "react";
import type { Images } from "@/types/pokemon";
import Pokeball from "./Pokeball";

interface Props {
  images: Images;
  name: string;
  sizes: string;
  priority?: boolean;
}

/**
 * Mostra images.large. Se falhar (API/CDN instável), tenta images.small direto;
 * se falhar de novo, mostra um placeholder com o nome da carta.
 */
export default function CardImage({ images, name, sizes, priority }: Props) {
  const [attempt, setAttempt] = useState(0);

  if (attempt >= 2) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-slate-100 p-2 text-center text-xs text-slate-500">
        <Pokeball className="h-8 w-8 opacity-50" />
        Imagem indisponível
      </div>
    );
  }

  return (
    <Image
      key={attempt}
      src={attempt === 0 ? images.large : images.small}
      alt={`Carta ${name}`}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={attempt === 1}
      onError={() => setAttempt((n) => n + 1)}
      className="rounded-lg object-contain"
    />
  );
}
