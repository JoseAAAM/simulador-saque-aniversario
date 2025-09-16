import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: '/resultado',
      destination: '/result'
    }
  ]
};

export default nextConfig;
