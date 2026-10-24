import type { NextConfig } from "next";

// Fully static export so the site can be hosted on GitHub Pages (or any static host).
// A version string added to image URLs, so phones that cached an older response fetch the current file after each deploy.
const assetVersion = (process.env.GITHUB_SHA ?? String(Date.now())).slice(0, 8);

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_ASSET_V: assetVersion },
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
