import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Outras configurações...
  experimental: {
    serverComponentsExternalPackages: ["shiki"], // Adiciona shiki à lista de pacotes externos
  },
};

export default nextConfig;
