import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Obrigatório (enunciado): libera as imagens das cartas
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pokemontcg.io",
        port: "",
        pathname: "**",
      },
    ],
  },
  // Tailwind v4 via loader do Turbopack
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
