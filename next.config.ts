import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      // Gizlilik sayfası /gizlilik altında toplandı; eski yol 404 vermesin.
      {
        source: "/gizlilik-politikasi",
        destination: "/gizlilik",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
