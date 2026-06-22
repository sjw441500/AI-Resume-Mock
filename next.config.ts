import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep pdf-parse and mammoth on the server only — they use native Node APIs
  serverExternalPackages: ["pdf-parse", "mammoth"],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    dirs: ["app", "components", "lib", "src"],
  },
};

export default nextConfig;
