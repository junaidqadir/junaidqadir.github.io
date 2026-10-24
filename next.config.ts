import type { NextConfig } from "next";

// Fully static export so the site can be hosted on GitHub Pages (or any static host).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
