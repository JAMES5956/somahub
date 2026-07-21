import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mtlmrqywifndqktujnyp.supabase.co",
      },
    ],
  },
};

export default nextConfig;