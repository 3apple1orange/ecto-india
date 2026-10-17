import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for Cloudflare Pages (build output goes to /out)
  output: "export",
  // No image optimiser in a static export: images are served as-is,
  // so keep every file in /public compressed (aim for under 300 KB).
  images: { unoptimized: true },
  // /privacy, not /privacy/ — matches the canonical URLs and sitemap
  trailingSlash: false,
};

export default nextConfig;